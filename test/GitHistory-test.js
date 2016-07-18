// LICENSE : MIT
"use strict";
const path = require("path");
const assert = require("power-assert");
import GitHistory from "../src/GitHistory";
describe("GitHistory", function() {
    it("should get log", function() {
        const rootDir = path.join(__dirname, "..");
        const history = new GitHistory(rootDir);
        return history.getModifiedDiffs({
            filePattern: "*.md"
        }).then(logs => {
            logs.forEach(log => {
                assert(log.commitMessage);
                assert(log.added);
                assert(log.deleted);
                assert(log.filePath);
            });
            assert(logs.length > 0);
        });
    });
});