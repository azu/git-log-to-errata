import GitHistory from "./GitHistory";
import MatcherTokenizer from "./MatcherTokenizer";
import DiffFilter from "./DiffFilter";
const debug = require("debug")("git-log-to-errata");
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
            const postFilteredTokenDiffs = DiffFilter.postFilter(resultModifiedTokenDiffs, postFilter);
            debug("post diffs", postFilteredTokenDiffs.length);
            return postFilteredTokenDiffs
        });
    });
};