import GitHistory from "./GitHistory";
import MatcherTokenizer from "./MatcherTokenizer";
import DiffFilter from "./DiffFilter";
module.exports = function({
    repository,
    branch = "master",
    pattern = "**/*.md",
}) {
    const history = new GitHistory(repository);
    return history.getModifiedDiffs({
        filePattern: pattern,
        branch
    }).then(modifiedDiffs => {
        console.log("pre", modifiedDiffs.length);
        const filteredDiffs = DiffFilter.preFilter(modifiedDiffs);
        return MatcherTokenizer.toTokenize(filteredDiffs).then(modifiedTokenDiffs => {
            let resultModifiedTokenDiffs = [];
            modifiedTokenDiffs.forEach(tokenDiff => {
                const array = MatcherTokenizer.createTokenDiffs(tokenDiff);
                resultModifiedTokenDiffs = resultModifiedTokenDiffs.concat(array);
            });
            const postFilteredTokenDiffs = DiffFilter.postFilter(resultModifiedTokenDiffs);
            console.log("post", postFilteredTokenDiffs.length);
            return postFilteredTokenDiffs
        });
    });
};