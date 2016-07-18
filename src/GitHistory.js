// LICENSE : MIT
"use strict";
const Git = require("nodegit");
const path = require("path");
const minimatch = require("minimatch");
const assert = require("assert");
import CommitVisitor from "./CommitVisitor";
/**
 * @typedef {Object} ModifiedDiff
 * @property {string} commitMessage
 * @property {string} deleted
 * @property {string} added
 * @property {string} filePath
 */
export default class GitHistory {
    constructor(repositoryPath) {
        assert(repositoryPath, "`repositoryPath` should be set");
        /**
         * @type {string}
         */
        this.repostiroyPath = path.resolve(process.cwd(), repositoryPath);
    }

    /**
     * @param {string} filePattern
     * @param {string} branch
     * @returns {Promise.<ModifiedDiff[]>}
     */
    getModifiedDiffs({
        filePattern,
        branch = "master"
    }) {
        assert(filePattern, "`filePattern` should be set. e.g.) `*.md`");
        const visitor = new CommitVisitor();
        return new Promise((resolve, reject) => {
            Git.Repository.open(this.repostiroyPath)
                .then(function(repo) {
                    return repo.getBranchCommit(branch);
                })
                // Display information about commits on master.
                .then(function(firstCommitOnMaster) {
                    // Create a new history event emitter.
                    const history = firstCommitOnMaster.history();
                    const promises = [];
                    const diffList = [];
                    // Listen for commit events from the history.
                    let useFilePath = undefined;
                    history.on("commit", function(commit) {
                        const commitMessage = commit.message();
                        const promise = visitor.visit(commit, (type, payload) => {
                            if (type === CommitVisitor.Types.patch) {
                                const patch = payload;
                                if (!patch.isModified()) {
                                    return;
                                }
                                const filePath = patch.newFile().path();
                                if (!minimatch(filePath, filePattern)) {
                                    return CommitVisitor.BREAK;
                                }
                                useFilePath = filePath
                            }
                            if (type === CommitVisitor.Types.lines) {
                                const lines = payload;
                                let diff = {
                                    commitMessage,
                                    filePath: useFilePath
                                };
                                lines.forEach(function(line) {
                                    if (diff["deleted"] && diff["added"]) {
                                        diffList.push(diff);
                                        diff = {
                                            commitMessage,
                                            filePath: useFilePath
                                        };
                                    }
                                    const origin = line.origin();
                                    if (String.fromCharCode(origin) === "-") {
                                        diff["deleted"] = line.content();
                                    } else if (String.fromCharCode(origin) === "+") {
                                        diff["added"] = line.content();
                                    }
                                });
                            }
                        });
                        promises.push(promise);
                    });

                    history.on('end', () => {
                        Promise.all(promises).then(() => {
                            resolve(diffList);
                        });
                    });
                    history.on("error", (error) => {
                        reject(error);
                    });
                    // Start emitting events.
                    history.start();
                }).catch(reject);
        });

    }
}