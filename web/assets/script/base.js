{
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  scrollbarWidth &&
    document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
}

String.prototype.toCamelCase = function () {
  return this.replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase());
};

String.prototype.toKebabCase = function () {
  return this.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

Storage.prototype.getSpots = async function () {
  const spots = JSON.parse(this.getItem("spots"));
  if (spots) return spots;
  await new Promise((resolve) => setTimeout(resolve, 200));
  return JSON.parse(this.getItem("spots"));
};

Storage.prototype.token = function () {
  return JSON.parse(this.getItem("gotrue.user"))?.token?.["access_token"];
};

// Prototype extension to make XPathResult iterable:
// Source: https://www.anycodings.com/1questions/1320706/how-to-use-arrayfrom-with-a-xpathresult
XPathResult.prototype[Symbol.iterator] = function* () {
  switch (this.resultType) {
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
    case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
      let result;
      while ((result = this.iterateNext())) {
        yield result;
      }
      break;
    case XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE:
    case XPathResult.ORDERED_NODE_SNAPSHOT_TYPE:
      for (let i = 0; i < this.snapshotLength; i++) {
        yield this.snapshotItem(i);
      }
      break;
    default:
      yield this.singleNodeValue;
      break;
  }
};
