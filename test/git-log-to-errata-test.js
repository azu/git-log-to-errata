// LICENSE : MIT
"use strict";
const path = require("path");
const assert = require("power-assert");
import main from "../src/git-log-to-errata";
describe("git-log-to-errata-test", function() {
    it("should get log", function() {
        const rootDir = path.join(__dirname, "..");
        return main({
            repository: rootDir,
            pattern: "**/*.md",
            branch: "master"
        }).then(diffs => {
            assert(Array.isArray(diffs));
        });
    });
});