"use strict";

import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from "rollup-plugin-copy";
import screeps from 'rollup-plugin-screeps';
import html from 'rollup-plugin-html';
import json from '@rollup/plugin-json'

let cfg;
const dest = process.env.DEST;
if (!dest) {
    console.log("No destination specified - code will be compiled but not uploaded");
} else if ((cfg = require("./screeps.json")[dest]) == null) {
    throw new Error("Invalid upload destination");
}

export default {
    input: "src/main.ts",
    output: {
        file: "dist/main.js",
        format: "cjs",
        sourcemap: true,
    },
    external: ['priority_queue.wasm', 'utf15'],

    plugins: [
        clear({ targets: ["dist"] }),
        resolve({ rootDir: "src" }),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        copy({
            targets: [
                { src: "./src/utils/PriorityQueue/priority_queue.wasm", dest: "./dist/" },
                { src: "./src/utils/moveOptimize/moveOptimize.js", dest: "./dist/" },
                { src: "./src/utils/utf15/index.js", dest: "./dist/", rename: "utf15.js" }
                // { src: "./src/profiler/index.js", dest:"./dist/", rename:"profiler.js" }
            ]
        }),
        html({
            include: '**/*.html',
            htmlMinifierOptions: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                minifyCSS: true,
                removeComments: true
            }
        }),
        json({ include: '**/*.json' }),
        screeps({ config: cfg, dryRun: cfg == null })
    ]
}
