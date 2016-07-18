// LICENSE : MIT
"use strict";
const ObjectAssign = require("object.assign");
const tokenize = require("kuromojin").tokenize;
const stripMarkdown = require('strip-markdown');
const remark = require("remark")().use(stripMarkdown);
/**
 *create matcher tokens
 */
export default class MatcherTokenizer {
    /**
     * @typedef {Object} ModifiedTokenDiff
     * @property {Object[]} oldTokens
     * @property {Object[]} newTokens
     */
    /**
     * @param {ModifiedDiff[]} modifiedDiffs
     * @returns {Promise.<ModifiedTokenDiff[]>}
     */
    static toTokenize(modifiedDiffs) {
        return new Promise((resolve, reject) => {
            const promises = modifiedDiffs.map(modifiedDiff => {
                const {added, deleted} = modifiedDiff;
                const result = {};
                const oldText = remark.process(deleted).contents.trim();
                const newText = remark.process(added).contents.trim();
                const addedTokenPromise = tokenize(newText);
                const deletedTokenPromise = tokenize(oldText);
                return Promise.all([deletedTokenPromise, addedTokenPromise]).then(([deletedTokens, addedTokens]) => {
                    result.newTokens = addedTokens;
                    result.oldTokens = deletedTokens;
                    return result;
                });
            });
            Promise.all(promises).then(resolve, reject);
        });
    }

    // 異なるtoken -+ 1 のtokenを集めた返す
    static createTokenDiffs(tokenDiff) {
        const results = [];
        let result = {oldTokens: [], newTokens: []};
        let isDifferent = false;
        const {oldTokens, newTokens} = tokenDiff;
        oldTokens.forEach((oldToken, index) => {
            const newToken = newTokens[index];
            if (!newToken) {
                return;
            }
            if (newToken.pos === oldToken.pos && newToken.surface_form === oldToken.surface_form) {
                // 3
                if (isDifferent) {
                    result.oldTokens.push(oldToken);
                    result.newTokens.push(newToken);
                    results.push(result);
                    result = {oldTokens: [], newTokens: []};
                }
                isDifferent = false;
                return;
            }
            isDifferent = true;
            // 1
            const prevOldToken = oldTokens[index - 1];
            const prevNewToken = newTokens[index - 1];
            if (prevOldToken) {
                if (result.oldTokens.indexOf(prevOldToken) === -1) {
                    result.oldTokens.push(prevOldToken);
                    if (prevNewToken) {
                        result.newTokens.push(prevNewToken);
                    }
                }
            }
            // 2
            result.oldTokens.push(oldToken);
            result.newTokens.push(newToken);
        });
        return results;
    }
}