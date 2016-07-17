// LICENSE : MIT
"use strict";
const path = require("path");
const assert = require("power-assert");
import GitHistory from "../src/GitHistory";
describe("git-log-to-errata-test", function() {
    it("should get log", function() {
        const rootDir = path.join(__dirname, "..");
        const history = new GitHistory(rootDir);
        return history.getModifiedDiffs({
            filePattern: "*.md"
        }).then(logs => {
            assert(logs.length > 0);
        });
    });
});