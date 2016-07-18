// LICENSE : MIT
"use strict";
const path = require("path");
const assert = require("power-assert");
import main from "../src/git-log-to-errata";
describe("git-log-to-errata-test", function() {
    it("should get log", function() {
        const rootDir = "/Users/azu/.ghq/github.com/azu/JavaScript-Plugin-Architecture";
        return main(rootDir).then(diffs => {
            diffs.forEach(diff => {
                console.log("", diff.oldTokens.map(token => token.surface_form).join(""))
                console.log("=>", diff.newTokens.map(token => token.surface_form).join(""))
            })
        });
    });
});