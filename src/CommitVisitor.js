// LICENSE : MIT
"use strict";
export default class CommitVisitor {
    static get Types() {
        return {
            "diff": "diff",
            "patch": "patch",
            "hunk": "hunk",
            "lines": "lines",
            "line": "line"
        }
    }

    /**
     * @return {string}
     */
    static get BREAK() {
        return "BREAK";
    }

    /**
     * @param commit
     * @param {Function} enter
     * @returns {Promise}
     */
    visit(commit, enter) {
        const Types = CommitVisitor.Types;
        const BREAK = CommitVisitor.BREAK;
        let isCanceled = false;
        return commit.getDiff().then(function(diffList) {
            if (isCanceled) {
                return;
            }
            return Promise.all(diffList.map(function(diff) {
                if (isCanceled) {
                    return;
                }
                isCanceled = enter(Types.diff, diff) === BREAK;
                return diff.patches().then(function(patches) {
                    if (isCanceled) {
                        return;
                    }
                    return Promise.all(patches.map(function(patch) {
                        if (isCanceled) {
                            return;
                        }
                        isCanceled = enter(Types.patch, patch) === BREAK;
                        return patch.hunks().then(function(hunks) {
                            if (isCanceled) {
                                return;
                            }
                            return Promise.all(hunks.map(function(hunk) {
                                if (isCanceled) {
                                    return;
                                }
                                isCanceled = enter(Types.hunk, hunk) === BREAK;
                                return hunk.lines().then(function(lines) {
                                    if (isCanceled) {
                                        return;
                                    }
                                    isCanceled = enter(Types.lines, lines) === BREAK;
                                    lines.forEach(function(line) {
                                        if (isCanceled) {
                                            return;
                                        }
                                        isCanceled = enter(Types.line, line) === BREAK;
                                    });
                                });
                            }));
                        });
                    }));
                });
            }));
        });
    }
}
