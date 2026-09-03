const esbuild = require("esbuild");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Clean dist folder
if (fs.existsSync("dist")) {
    fs.rmSync("dist", { recursive: true });
}
fs.mkdirSync("dist");

// Common build options
const commonOptions = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    sourcemap: true,
    external: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
    ],
    target: ["es2020"],
};

// Build ESM
esbuild.buildSync({
    ...commonOptions,
    format: "esm",
    outfile: "dist/index.esm.js",
});

// Build CJS
esbuild.buildSync({
    ...commonOptions,
    format: "cjs",
    outfile: "dist/index.js",
});

// Generate TypeScript declarations
console.log("Generating TypeScript declarations...");
execSync(
    "npx tsc --declaration --emitDeclarationOnly --outDir dist --project tsconfig.build.json",
    {
        stdio: "inherit",
    }
);

console.log("Build completed successfully!");
