const projectid = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

exports.imageUrl = (source) => {
  if (!source) return;
  const imageId = source.asset["_ref"]?.slice(6);
  const url = `https://cdn.sanity.io/images/${projectid}/${dataset}/${imageId}`;
  const completeUrl =
    url.slice(0, url.lastIndexOf("-")) +
    "." +
    url.slice(url.lastIndexOf("-") + 1);

  const alt = source?.tags?.alt;
  const title = source?.tags?.title;

  return {
    url: completeUrl,
    ...(title ? { title } : ""),
    ...(alt ? { alt } : ""),
  };
};

exports.reducer = (data) =>
  Object.entries(data).reduce((acc, [key, value]) => {
    if (excludeList.includes(key)) return acc;
    if (key.toLowerCase().includes("logo")) value = this.imageUrl(value);
    acc[key] = value;
    return acc;
  }, {});

const excludeList = ["_rev", "_type", "_id", "_updatedAt", "_createdAt"];
