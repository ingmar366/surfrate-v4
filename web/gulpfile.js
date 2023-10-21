const del = require("del");
const glob = require("glob");
const gulp = require("gulp");
const through = require("through2");

const include = require("gulp-include");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const terser = require("gulp-terser");

// PostCSS plugins:
const autoprefixer = require("autoprefixer");
const inlineSvg = require("postcss-inline-svg");
const mediaMinMax = require("postcss-media-minmax");
const combineMQ = require("postcss-combine-media-query");

// deleting old files in build directory
const clearBuildDir = () => del(["./build/assets/*"]);

const buildIndexFiles = () => {
  return gulp
    .src("./assets/styles/**/_index.scss", { read: false })
    .pipe(
      through.obj((file, encoding, callback) => {
        file.contents = Buffer.from(
          glob
            .sync("**/*.scss", { cwd: file.dirname, ignore: ["_*"] })
            .map((name) => `@import "${name}"; `)
            .join("\n"),
          encoding
        );
        callback(null, file);
      })
    )
    .pipe(gulp.dest("./assets/styles"));
};

const buildScript = () => {
  return gulp
    .src("./assets/*.bundle.js", { sourcemaps: true })
    .pipe(include())
    .pipe(terser({ keep_classnames: true, keep_fnames: true }))
    .pipe(
      rename((path_) => {
        path_.basename = `${path_.basename.replace(".bundle", "")}.min`;
      })
    )
    .pipe(gulp.dest("./build/assets", { sourcemaps: "." }));
};

const buildStyles = () => {
  return gulp
    .src("./assets/*.bundle.scss", { sourcemaps: true })
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(postcss([autoprefixer, inlineSvg, mediaMinMax, combineMQ]))
    .pipe(
      rename((path_) => {
        path_.basename = `${path_.basename.replace(".bundle", "")}.min`;
      })
    )
    .pipe(gulp.dest("./build/assets", { sourcemaps: "." }));
};

const watch = () => {
  gulp.watch("./assets/styles", async () => {
    await del(glob.sync("./build/**/*.scss"));
    buildStyles();
  });
  gulp.watch("./assets/script", async () => {
    await del(glob.sync("./build/**/*.js"));
    buildScript();
  });
};

gulp.task(
  "default",
  gulp.series(
    gulp.parallel(clearBuildDir, buildIndexFiles),
    gulp.parallel(buildScript, buildStyles)
  )
);

gulp.task(
  "run-local",
  gulp.series(
    gulp.parallel(clearBuildDir, buildIndexFiles),
    gulp.parallel(buildScript, buildStyles),
    gulp.parallel(watch)
  )
);
