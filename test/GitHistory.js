// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import GitHistory from "../src/GitHistory";
describe("git-log-to-errata-test", function() {
    it("should get log", function() {
        const history = new GitHistory("/Users/azu/.ghq/github.com/azu/JavaScript-Plugin-Architecture");
        return history.getModifiedDiffs({
            filePattern: "*.md"
        }).then(logs => {
            assert(logs.length > 0);
        });
    });
});