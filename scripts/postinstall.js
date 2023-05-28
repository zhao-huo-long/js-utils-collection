const fs = require("fs");
const path = require("path");
const workDir = process.cwd();

// copy node_modules/tinymce to static/tinymce
fs.cpSync(
  path.resolve(workDir, "node_modules", "tinymce"),
  path.resolve(workDir, "static", "tinymce"),
  {
    recursive: true,
    force: true,
  }
);
