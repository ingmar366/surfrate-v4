// Base component
_surfrate.components.Base = class {
  listen(target, types, handler, options) {
    [types]
      .flat()
      .forEach((type_) => target.addEventListener(type_, handler, options));
    return handler;
  }

  unlisten(target, types, handler) {
    [types]
      .flat()
      .forEach((type_) => target.removeEventListener(type_, handler));
  }

  dispatch(target, types, detail, bubbles = true) {
    [types]
      .flat()
      .forEach((type_) =>
        target.dispatchEvent(new CustomEvent(type_, { detail, bubbles }))
      );
  }

  fetching(path, method, detail = undefined) {
    const token = localStorage.token();
    return fetch(path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : ""),
      },
      ...(detail ? { body: JSON.stringify(detail) } : ""),
    }).then((response) => {
      if (!response.ok) throw response;
      return response.json();
    });
  }

  static fromElement(root, params) {
    // Instantiate the component:
    const name = this.name.toKebabCase();
    const elements = this.getComponentElements(root, name);
    const params_ = {
      ...this.defaultParams,
      ...this.getComponentParams(root, name),
      ...params,
    };
    root._component = new this(root, elements, params_);

    // Clean up the component HTML:
    delete root.dataset.component;
    Object.entries(elements).forEach(
      ([key, element]) => delete element.dataset[`${name}:${key}`]
    );
    Object.keys(params_).forEach(
      (key) => delete root.dataset[`${name}:${key}`]
    );

    return root._component;
  }

  static getComponentElements(root, name) {
    const query = `.//*[@*[starts-with(name(), "data-${name}:")]]`;
    const result = new XPathEvaluator().evaluate(
      query,
      root,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
    );
    return Object.fromEntries(
      Array.from(result).map((element) => {
        const [key, value] = Object.entries(element.dataset).find(
          ([key, value]) => key.startsWith(`${name.toCamelCase()}:`)
        );
        return [key.split(":").pop(), element];
      })
    );
  }

  static getComponentParams(root, name) {
    return Object.fromEntries(
      Object.entries(root.dataset)
        .filter(([key, value]) => key.startsWith(`${name.toCamelCase()}:`))
        .map(([key, value]) => [
          key.split(":").pop(),
          this.parseExpression(value, root),
        ])
    );
  }

  static parseExpression(expression, element) {
    if (!/^(\${1,2}|#|\^|&\$?|\*|@):/.test(expression)) {
      try {
        return JSON.parse(expression);
      } catch (error) {
        return expression;
      }
    }
    const [token, value_] = expression.split(":");
    switch (token) {
      case "$":
        return document.querySelector(value_);
      case "$$":
        return document.querySelectorAll(value_);
      case "#":
        return document.getElementById(value_);
      case "^":
        return element.closest(value_);
      case "&":
        return element.parentElement;
      case "&$":
        return element.parentElement.querySelector(value_);
      case "*":
        return JSON.parse(value_);
      case "@":
        return value_
          .replace(/\[(\d+)\]/, ".$1")
          .split(".")
          .reduce((obj, key) => obj && obj[key], window);
    }
  }
};
