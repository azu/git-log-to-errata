// LICENSE : MIT
"use strict";
const Git = require("nodegit");
const path = require("path");
const minimatch = require("minimatch");
const assert = require("assert");
import CommitVisitor from "./CommitVisitor";
/**
 * @typedef {Object} ModifiedDiff
 * @property {string} deleted
 * @property {string} added
 * @property {string} filePath
 */
/**
 * @param {string} repoPath
 * @param {string} filePattern
 * @returns {Promise.<ModifiedDiff[]>}
 */
export default function getModifiedDiffs({
    repoPath,
    filePattern
}) {
    assert(repoPath, "`repoPath` should be set");
    assert(filePattern, "`filePattern` should be set. e.g.) `*.md`");
    const absolutePath = path.resolve(process.cwd(), repoPath);
    const visitor = new CommitVisitor();
    return new Promise((resolve, reject) => {
        Git.Repository.open(absolutePath)
            .then(function(repo) {
                return repo.getMasterCommit();
            })
            // Display information about commits on master.
            .then(function(firstCommitOnMaster) {
                // Create a new history event emitter.
                var history = firstCommitOnMaster.history();

                // Create a counter to only show up to 9 entries.
                var count = 0;
                const promises = [];
                const diffList = [];
                // Listen for commit events from the history.
                let useFilePath = undefined;
                history.on("commit", function(commit) {
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
                                filePath: useFilePath
                            };
                            lines.forEach(function(line) {
                                if (diff["deleted"] && diff["added"]) {
                                    diffList.push(diff);
                                    diff = {
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