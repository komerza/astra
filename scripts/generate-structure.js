#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Files and directories to ignore
const IGNORE_PATTERNS = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "out",
  ".DS_Store",
  "Thumbs.db",
  "*.log",
  ".env*",
  "coverage",
  ".nyc_output",
  "*.tgz",
  "*.tar.gz",
  ".pnpm-debug.log*",
  ".pnpm-lock.yaml",
  "pnpm-lock.yaml",
];

function shouldIgnore(name, isDirectory) {
  return IGNORE_PATTERNS.some((pattern) => {
    if (pattern.includes("*")) {
      // Handle glob patterns
      const regex = new RegExp(pattern.replace(/\*/g, ".*"));
      return regex.test(name);
    }
    return name === pattern;
  });
}

function generateStructure(dir, prefix = "", maxDepth = 10, currentDepth = 0) {
  if (currentDepth >= maxDepth) return "";

  let result = "";

  try {
    const items = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !shouldIgnore(item.name, item.isDirectory()))
      .sort((a, b) => {
        // Directories first, then files
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
      });

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      const currentPrefix = isLast ? "└── " : "├── ";
      const nextPrefix = isLast ? "    " : "│   ";

      result += `${prefix}${currentPrefix}${item.name}`;

      if (item.isDirectory()) {
        result += "/\n";
        const fullPath = path.join(dir, item.name);
        result += generateStructure(
          fullPath,
          prefix + nextPrefix,
          maxDepth,
          currentDepth + 1
        );
      } else {
        result += "\n";
      }
    });
  } catch (error) {
    // Skip directories we can't read
  }

  return result;
}

function generateFlatList(dir, basePath = "", result = []) {
  try {
    const items = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !shouldIgnore(item.name, item.isDirectory()));

    items.forEach((item) => {
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

      if (item.isDirectory()) {
        result.push(`${relativePath}/`);
        generateFlatList(path.join(dir, item.name), relativePath, result);
      } else {
        result.push(relativePath);
      }
    });
  } catch (error) {
    // Skip directories we can't read
  }

  return result;
}

function generateAIStructure(
  dir,
  basePath = "",
  result = { directories: [], files: [] }
) {
  try {
    const items = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !shouldIgnore(item.name, item.isDirectory()));

    items.forEach((item) => {
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        result.directories.push({
          path: relativePath,
          name: item.name,
          parent: basePath || null,
        });
        generateAIStructure(fullPath, relativePath, result);
      } else {
        const stats = fs.statSync(fullPath);
        const ext = path.extname(item.name).toLowerCase();

        // Categorize file types
        let category = "other";
        if ([".tsx", ".ts", ".jsx", ".js"].includes(ext)) category = "code";
        else if ([".css", ".scss", ".sass", ".less"].includes(ext))
          category = "style";
        else if ([".json", ".yaml", ".yml", ".toml"].includes(ext))
          category = "config";
        else if ([".md", ".txt"].includes(ext)) category = "documentation";
        else if (
          [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext)
        )
          category = "image";
        else if ([".html"].includes(ext)) category = "markup";

        result.files.push({
          path: relativePath,
          name: item.name,
          parent: basePath || null,
          extension: ext,
          category: category,
          size: stats.size,
          isExecutable: !!(stats.mode & parseInt("111", 8)),
        });
      }
    });
  } catch (error) {
    // Skip directories we can't read
  }

  return result;
}

function main() {
  const rootDir = process.cwd();
  const args = process.argv.slice(2);
  const format = args.includes("--flat")
    ? "flat"
    : args.includes("--ai")
    ? "ai"
    : args.includes("--compact")
    ? "compact"
    : "tree";
  const maxDepth = args.includes("--max-depth")
    ? parseInt(args[args.indexOf("--max-depth") + 1]) || 10
    : 10;

  if (format === "ai") {
    const aiStructure = generateAIStructure(rootDir);
    const projectName = path.basename(rootDir);

    // Generate AI-optimized output
    const output = {
      project: {
        name: projectName,
        type: "Next.js Application",
        framework: "React/TypeScript",
        structure_version: "1.0",
      },
      summary: {
        total_files: aiStructure.files.length,
        total_directories: aiStructure.directories.length,
        file_categories: getCategorySummary(aiStructure.files),
        key_directories: getKeyDirectories(aiStructure.directories),
      },
      structure: {
        directories: aiStructure.directories,
        files: aiStructure.files.map((file) => ({
          path: file.path,
          category: file.category,
          extension: file.extension,
          parent: file.parent,
        })),
      },
    };

    console.log(JSON.stringify(output, null, 2));
    return;
  }

  if (format === "compact") {
    console.log(`# ${path.basename(rootDir)} (Next.js/React/TypeScript)`);
    console.log("");
    const compactList = generateCompactList(rootDir);
    compactList.forEach((item) => console.log(item));
    return;
  }

  console.log(`Project Structure: ${path.basename(rootDir)}\n`);

  if (format === "flat") {
    const flatList = generateFlatList(rootDir);
    flatList.forEach((item) => console.log(item));
  } else {
    console.log(`${path.basename(rootDir)}/`);
    console.log(generateStructure(rootDir, "", maxDepth));
  }
}

function getCategorySummary(files) {
  const summary = {};
  files.forEach((file) => {
    summary[file.category] = (summary[file.category] || 0) + 1;
  });
  return summary;
}

function getKeyDirectories(directories) {
  return directories
    .filter((dir) => !dir.parent || dir.parent.split("/").length < 2)
    .map((dir) => dir.path)
    .sort();
}

function generateCompactList(dir, basePath = "", result = []) {
  try {
    const items = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((item) => !shouldIgnore(item.name, item.isDirectory()));

    items.forEach((item) => {
      const relativePath = basePath ? `${basePath}/${item.name}` : item.name;

      if (item.isDirectory()) {
        result.push(`${relativePath}/`);
        generateCompactList(path.join(dir, item.name), relativePath, result);
      } else {
        const ext = path.extname(item.name).toLowerCase();
        let cat = "o"; // other
        if ([".tsx", ".ts", ".jsx", ".js"].includes(ext)) cat = "c";
        else if ([".css", ".scss", ".sass", ".less"].includes(ext)) cat = "s";
        else if ([".json", ".yaml", ".yml", ".toml"].includes(ext)) cat = "cfg";
        else if ([".md", ".txt"].includes(ext)) cat = "d";
        else if (
          [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"].includes(ext)
        )
          cat = "i";

        // Format: path:category|summary
        result.push(`${relativePath}:${cat}|[summary needed]`);
      }
    });
  } catch (error) {
    // Skip directories we can't read
  }

  return result;
}

if (require.main === module) {
  main();
}

module.exports = {
  generateStructure,
  generateFlatList,
  generateAIStructure,
  generateCompactList,
};
