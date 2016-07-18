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
     * @property {string} oldText
     * @property {Object[]} newTokens
     * @property {string} newText
     */
    /**
     * @typedef {Object} ModifiedTokenMatchDiff
     * @property {Object[]} oldTokens
     * @property {string} oldText
     * @property {Object[]} newTokens
     * @property {string} newText
     * @property {number} start
     * @property {number} end
     */
    /**
     * @param {ModifiedDiff[]} modifiedDiffs
     * @returns {Promise.<ModifiedTokenDiff[]>}
     */
    static toTokenize(modifiedDiffs) {
        const removeWordPosition = (token) => {
            delete token.word_position;
            return token;
        };
        return new Promise((resolve, reject) => {
            const promises = modifiedDiffs.map(modifiedDiff => {
                const {added, deleted} = modifiedDiff;
                let oldText = deleted;
                try {
                    oldText = remark.process(deleted).contents.trim();
                } catch (e) {
                }
                let newText = added;
                try {
                    newText = remark.process(added).contents.trim()
                } catch (e) {
                }
                const result = {
                    oldText,
                    newText
                };
                const addedTokenPromise = tokenize(newText);
                const deletedTokenPromise = tokenize(oldText);
                return Promise.all([deletedTokenPromise, addedTokenPromise]).then(([deletedTokens, addedTokens]) => {
                    result.newTokens = addedTokens.map(removeWordPosition);
                    result.oldTokens = deletedTokens.map(removeWordPosition);
                    return result;
                });
            });
            Promise.all(promises).then(resolve, reject);
        });
    }

    /**
     * 異なるtoken + 前後1 のtokenを集めた返す
     * @param tokenDiff
     * @returns {ModifiedTokenMatchDiff[]}
     */
    static createTokenDiffs(tokenDiff) {
        const results = [];
        let result = {oldTokens: [], newTokens: [], start: undefined, end: undefined};
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
                    result = {oldTokens: [], newTokens: [], start: undefined, end: undefined};
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
            // record start
            if (result.start === undefined) {
                result.start = result.oldTokens.length;
            }
            result.oldTokens.push(oldToken);
            result.newTokens.push(newToken);
            // update end
            result.end = result.oldTokens.length;
        });
        return results.map(result => {
            const oldText = result.oldTokens.map(token => token.surface_form).join("");
            const newText = result.newTokens.map(token => token.surface_form).join("");
            return ObjectAssign({}, result, {
                oldText,
                newText
            })
        });
    }
}