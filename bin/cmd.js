#!/usr/bin/env node
"use strict";
const meow = require('meow');
const cli = meow(`
    Usage
      $ git-log-to-errata <path-to-dir>

    <path-to-dir> should have ".git" directory

    Options
      --branch branch name
      --pattern filter file pattern(e.g. "**/*.md"
 
    Examples
      $ git-log-to-errata --pattern "**/*.md" path/to/dir
      JSON 🌈
`);
const repository = cli.input[0];
const flags = cli.flags;
const toErrata = require("../lib/git-log-to-errata");
toErrata({
    repository: repository,
    branch: flags.branch,
    pattern: flags.pattern
}).then(results => {
    console.log(JSON.stringify(results, null, 4));
});
