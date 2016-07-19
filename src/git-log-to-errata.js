"use strict";
import GitHistory from "./GitHistory";
import MatcherTokenizer from "./MatcherTokenizer";
import DiffFilter from "./DiffFilter";
const debug = require("debug")("git-log-to-errata");

/**
 * @typedef {Object} ErrataTokenDiff
 * @property {number} id
 * @property {Object[]} oldTokens
 * @property {string} oldText
 * @property {Object[]} newTokens
 * @property {string} newText
 * @property {number} start
 * @property {number} end
 */
/**
 *
 * @param {string} repository
 * @param {string} [branch
 * @param {string} [pattern]
 * @param {function} [preFilter]
 * @param {function} [postFilter]
 * @returns {Promise.<ErrataTokenDiff>}
 */
module.exports = function({
    repository,
    branch = "master",
    pattern = "**/*.md",
    preFilter,
    postFilter
}) {
    const history = new GitHistory(repository);
    return history.getModifiedDiffs({
        filePattern: pattern,
        branch
    }).then(modifiedDiffs => {
        debug("pre diffs", modifiedDiffs.length);
        const filteredDiffs = DiffFilter.preFilter(modifiedDiffs, preFilter);
        return MatcherTokenizer.toTokenize(filteredDiffs).then(modifiedTokenDiffs => {
            let resultModifiedTokenDiffs = [];
            modifiedTokenDiffs.forEach(tokenDiff => {
                const array = MatcherTokenizer.createTokenDiffs(tokenDiff);
                resultModifiedTokenDiffs = resultModifiedTokenDiffs.concat(array);
            });
            const errataDiffs = resultModifiedTokenDiffs.map((diff, index) => {
                diff.id = index + 1;
                return diff;
            });
            const postFilteredTokenDiffs = DiffFilter.postFilter(errataDiffs, postFilter);
            debug("post diffs", postFilteredTokenDiffs.length);
            return postFilteredTokenDiffs
        });
    });
};