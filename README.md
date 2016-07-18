# git-log-to-errata

Git log to errata list.

1. Get all modified diff that matches file pattern.
2. Create errata data from modified diff.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install git-log-to-errata

## Usage


    Usage
      $ git-log-to-errata <path-to-dir>

    <path-to-dir> should have ".git" directory

    Options
      --branch branch name
      --pattern filter file pattern(e.g. "**/*.md"
 
    Examples
      $ git-log-to-errata --pattern "**/*.md" path/to/dir
      output JSON
      

## Example

- `token` is created by [kuromoji.js](https://github.com/takuyaa/kuromoji.js "kuromoji.js")
- `start` is index which start real difference index of token
- `end` is index real difference index of token
- `oldText` Maybe wrong text
- `newText` Updated text

```json
 [
    {
        "oldTokens": [
            {
                "word_id": 1299820,
                "word_type": "KNOWN",
                "surface_form": "、",
                "pos": "名詞",
                "pos_detail_1": "数",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "、",
                "reading": "、",
                "pronunciation": "、"
            },
            {
                "word_id": 230,
                "word_type": "UNKNOWN",
                "surface_form": "グロール",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "*"
            },
            {
                "word_id": 871050,
                "word_type": "KNOWN",
                "surface_form": "空間",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "空間",
                "reading": "クウカン",
                "pronunciation": "クーカン"
            }
        ],
        "newTokens": [
            {
                "word_id": 1299820,
                "word_type": "KNOWN",
                "surface_form": "、",
                "pos": "名詞",
                "pos_detail_1": "数",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "、",
                "reading": "、",
                "pronunciation": "、"
            },
            {
                "word_id": 534010,
                "word_type": "KNOWN",
                "surface_form": "グローバル",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "グローバル",
                "reading": "グローバル",
                "pronunciation": "グローバル"
            },
            {
                "word_id": 871050,
                "word_type": "KNOWN",
                "surface_form": "空間",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "空間",
                "reading": "クウカン",
                "pronunciation": "クーカン"
            }
        ],
        "start": 1,
        "end": 2,
        "oldText": "、グロール空間",
        "newText": "、グローバル空間"
    },
    {
        "oldTokens": [
            {
                "word_id": 662320,
                "word_type": "KNOWN",
                "surface_form": "項目",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "項目",
                "reading": "コウモク",
                "pronunciation": "コーモク"
            },
            {
                "word_id": 2594290,
                "word_type": "KNOWN",
                "surface_form": "に",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "に",
                "reading": "ニ",
                "pronunciation": "ニ"
            },
            {
                "word_id": 729050,
                "word_type": "KNOWN",
                "surface_form": "かなり",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "かなり",
                "reading": "カナリ",
                "pronunciation": "カナリ"
            }
        ],
        "newTokens": [
            {
                "word_id": 662320,
                "word_type": "KNOWN",
                "surface_form": "項目",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "項目",
                "reading": "コウモク",
                "pronunciation": "コーモク"
            },
            {
                "word_id": 2595180,
                "word_type": "KNOWN",
                "surface_form": "が",
                "pos": "助詞",
                "pos_detail_1": "格助詞",
                "pos_detail_2": "一般",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "が",
                "reading": "ガ",
                "pronunciation": "ガ"
            },
            {
                "word_id": 729050,
                "word_type": "KNOWN",
                "surface_form": "かなり",
                "pos": "名詞",
                "pos_detail_1": "一般",
                "pos_detail_2": "*",
                "pos_detail_3": "*",
                "conjugated_type": "*",
                "conjugated_form": "*",
                "basic_form": "かなり",
                "reading": "カナリ",
                "pronunciation": "カナリ"
            }
        ],
        "start": 1,
        "end": 2,
        "oldText": "項目にかなり",
        "newText": "項目がかなり"
    }
]
```

## Changelog

See [Releases page](https://github.com/azu/git-log-to-errata/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/git-log-to-errata/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
