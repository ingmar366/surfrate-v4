require("dotenv").config();
const nunjucks = require("nunjucks");

const INTL_LOCALE = process.env.INTL_LOCALE;
const INTL_FORMATS = require(`./intl/${INTL_LOCALE}`);

const INTL_DATE_FORMATS = INTL_FORMATS.dateFormats;
const INTL_TIME_FORMATS = INTL_FORMATS.timeFormats;
const INTL_NUMBER_FORMATS = INTL_FORMATS.numberFormats;

const GLOBAL_ENV_KEYS = ["INTL_LOCALE", "API_PROXY_BASE_URL"];

Date.prototype._toLocaleDateString = Date.prototype.toLocaleDateString;
Date.prototype.toLocaleDateString = function (
  locales = INTL_LOCALE,
  optionsOrFormat
) {
  const format = Object(optionsOrFormat) instanceof String;
  const options = {
    ...(format ? INTL_DATE_FORMATS[optionsOrFormat] : optionsOrFormat),
    ...{ replace: [], suffix: "" },
  };
  return (
    this._toLocaleDateString(locales, options).replace(...options.replace) +
    options.suffix
  );
};

Date.prototype._toLocaleTimeString = Date.prototype.toLocaleTimeString;
Date.prototype.toLocaleTimeString = function (
  locales = INTL_LOCALE,
  optionsOrFormat
) {
  const format = Object(optionsOrFormat) instanceof String;
  const options = {
    ...(format ? INTL_TIME_FORMATS[optionsOrFormat] : optionsOrFormat),
    ...{ replace: [], suffix: "" },
  };
  return (
    this._toLocaleTimeString(locales, options).replace(...options.replace) +
    options.suffix
  );
};

Number.prototype._toLocaleString = Number.prototype.toLocaleString;
Number.prototype.toLocaleString = function (
  locales = INTL_LOCALE,
  optionsOrFormat
) {
  const format = Object(optionsOrFormat) instanceof String;
  const options = format
    ? INTL_NUMBER_FORMATS[optionsOrFormat]
    : optionsOrFormat;
  return this._toLocaleString(locales, options);
};

const globals = {
  Math,
  timestamp: Date.now(),
  env: Object.fromEntries(
    GLOBAL_ENV_KEYS.map((key) => [key, process.env[key]])
  ),
};

const filters = {
  limit: (values, length) => values.slice(0, length),
  skip: (values, length) => values.slice(length),

  split: (value, delimiter) => value.split(delimiter),
  match: (value, pattern) => new RegExp(pattern).test(value),

  pick: (values, ...keys) =>
    Object.fromEntries(keys.map((key) => [key, values[key]])),

  dateformat: (value, format) =>
    new Date(value).toLocaleDateString(undefined, format),
  timeformat: (value, format) =>
    new Date(value).toLocaleTimeString(undefined, format),
  numberformat: (value, format) =>
    new Number(value).toLocaleString(undefined, format),

  namespace: (obj) =>
    new nunjucks.runtime.SafeString(
      `{${Object.entries(obj)
        .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
        .join(",")}}`
    ),
};

const extensions = {};

module.exports.configure = (path) => {
  const env = nunjucks.configure(path);
  Object.entries(globals).forEach(([key, value]) => env.addGlobal(key, value));
  Object.entries(filters).forEach(([key, value]) => env.addFilter(key, value));
  Object.entries(extensions).forEach(([key, extension]) =>
    env.addExtension(key, new extension())
  );
};

module.exports.filters = filters;
module.exports.globals = globals;
module.exports.extensions = extensions;
