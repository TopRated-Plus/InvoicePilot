const fs = require("fs");
const path = require("path");
const ignore = require("ignore");

const ROOT = process.cwd();

// initialize ignore
const ig = ignore();

// load .gitignore
if (fs.existsSync(".gitignore")) {
  const gitignore = fs
    .readFileSync(".gitignore", "utf8")
    .split("\n")
    .filter(Boolean);

  ig.add(gitignore);
}

function generateTree(dir, prefix = "") {
  let files = fs.readdirSync(dir);

  // remove ignored files
  files = files.filter((file) => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative(ROOT, fullPath).replace(/\\/g, "/");

    return !ig.ignores(relativePath);
  });

  files.forEach((file, index) => {
    const fullPath = path.join(dir, file);
    const isLast = index === files.length - 1;
    const pointer = isLast ? "└── " : "├── ";

    console.log(prefix + pointer + file);

    if (fs.statSync(fullPath).isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      generateTree(fullPath, newPrefix);
    }
  });
}

console.log(path.basename(ROOT));
generateTree(ROOT);