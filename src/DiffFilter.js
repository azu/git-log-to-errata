// LICENSE : MIT
"use strict";
require('array.prototype.find').shim();
/**
 * @param {ModifiedDiff} modifiedDiff
 */
const defaultPrePredicate = (modifiedDiff) => {
    const filterWord = /(\bfix|typo|修正)/;
    return filterWord.test(modifiedDiff.commitMessage);
};
/**
 * @param {ModifiedTokenDiff} modifiedTokenDiff
 */
const defaultPostPredicate = (modifiedTokenDiff) => {
    const diffLimit = 3;
    if (modifiedTokenDiff.newTokens.length > diffLimit) {
        return false;
    }
    // 記号周りの経脳は無視
    const ignoreRegExp = /[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~a-zA-Z0-9]/;
    if (ignoreRegExp.test(modifiedTokenDiff.oldText) || ignoreRegExp.test(modifiedTokenDiff.newText)) {
        return false;
    }
    // 接続詞を句点に変える変更は無視
    const oldMiddleToken = modifiedTokenDiff.oldTokens[1];
    const newMiddleToken = modifiedTokenDiff.oldTokens[1];
    const tenRegExp = /[、。]/;
    if (tenRegExp.test(oldMiddleToken.surface_form) || tenRegExp.test(newMiddleToken.surface_form)) {
        return false;
    }
    return true;
};


/**
 * @param {ModifiedTokenDiff[]} modifiedTokenDiffs
 */
const unique = (modifiedTokenDiffs) => {
    const results = [];
    modifiedTokenDiffs.forEach(modifiedTokenDiff => {
        const matchText = modifiedTokenDiff.oldText + "|" + modifiedTokenDiff.newText;
        const foundDiff = results.find((target) => {
            return matchText === (target.oldText + "|" + target.newText);
        });
        if (!foundDiff) {
            results.push(modifiedTokenDiff);
        }
    });
    return results;
};
export default class DiffFilter {
    /**
     * @param {ModifiedDiff[]} modifiedDiffs
     * @param {function(ModifiedDiff):boolean}predicate
     */
    static preFilter(modifiedDiffs, predicate = defaultPrePredicate) {
        return modifiedDiffs.filter(predicate);
    }

    /**
     * @param {ModifiedTokenDiff[]} modifiedTokenDiffs
     * @param {function(ModifiedTokenDiff):boolean}predicate
     */
    static postFilter(modifiedTokenDiffs, predicate = defaultPostPredicate) {
        return unique(modifiedTokenDiffs.filter(predicate));
    }
}