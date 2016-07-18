// LICENSE : MIT
"use strict";
const path = require("path");
const assert = require("power-assert");
import main from "../src/git-log-to-errata";
describe("git-log-to-errata-test", function() {
    it("should get log", function() {
        const rootDir = "/Users/azu/.ghq/github.com/azu/promises-book";
        return main({
            repository: rootDir,
            pattern: "**/*.adoc"
        }).then(diffs => {
            diffs.forEach(diff => {
                console.log("", diff.oldText);
                console.log("=>", diff.newText);
            })
        });
    });
});