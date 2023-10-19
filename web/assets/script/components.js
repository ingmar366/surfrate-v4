{
  const initComponents = () =>
    document
      .querySelectorAll("[data-component]")
      .forEach((root) =>
        _surfrate.components[root.dataset.component].fromElement(root)
      );

  // Instantiate new components now:
  initComponents();

  // Instantiate new components when they are added to the document:
  new MutationObserver(
    (mutations) =>
      mutations.some((mutation) => mutation.addedNodes) && initComponents()
  ).observe(document.body, { childList: true, subtree: true });
}
