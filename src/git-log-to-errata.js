import GitHistory from "./GitHistory";
import MatcherTokenizer from "./MatcherTokenizer";
module.exports = function(repository, pattern = "*.md") {
    const history = new GitHistory(repository);
    return history.getModifiedDiffs({
        filePattern: pattern
    }).then(modifiedDiffs => {
        return MatcherTokenizer.toTokenize(modifiedDiffs).then(modifiedTokenDiffs => {
            let results = [];
            modifiedTokenDiffs.forEach(tokenDiff => {
                const array = MatcherTokenizer.createTokenDiffs(tokenDiff);
                results = results.concat(array);
            });
            return results;
        });
    });
};