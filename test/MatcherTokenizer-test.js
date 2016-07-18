// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import MatcherTokenizer from "../src/MatcherTokenizer";
describe("MatcherTokenizer-test", function() {
    describe("#create", function() {
        it("should return matcher tokens", function() {
            const diffs = [
                {
                    filePath: "README.md",
                    added: "小さものを",
                    deleted: "小さなものを"
                }
            ];
            return MatcherTokenizer.toTokenize(diffs).then(tokenDiffs => {
                assert(Array.isArray(tokenDiffs));
                const [diff] = tokenDiffs;
                assert(Array.isArray(diff.newTokens));
                assert(Array.isArray(diff.oldTokens));
            });
        });
    });
    describe("#createTokenDiffs", function() {
        it("should return {oldTokens, newTokens}", function() {
            const oldTokens = [
                {
                    word_id: 956570,
                    word_type: 'KNOWN',
                    word_position: 1,
                    surface_form: 'これ',
                    pos: '名詞',
                    pos_detail_1: '代名詞',
                    pos_detail_2: '一般',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'これ',
                    reading: 'コレ',
                    pronunciation: 'コレ'
                },
                {
                    word_id: 2595180,
                    word_type: 'KNOWN',
                    word_position: 3,
                    surface_form: 'が',
                    pos: '助詞',
                    pos_detail_1: '格助詞',
                    pos_detail_2: '一般',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'が',
                    reading: 'ガ',
                    pronunciation: 'ガ'
                },
                {
                    word_id: 871450,
                    word_type: 'KNOWN',
                    word_position: 4,
                    surface_form: '日本語',
                    pos: '名詞',
                    pos_detail_1: '一般',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: '日本語',
                    reading: 'ニホンゴ',
                    pronunciation: 'ニホンゴ'
                },
                {
                    word_id: 305080,
                    word_type: 'KNOWN',
                    word_position: 7,
                    surface_form: 'です',
                    pos: '助動詞',
                    pos_detail_1: '*',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '特殊・デス',
                    conjugated_form: '基本形',
                    basic_form: 'です',
                    reading: 'デス',
                    pronunciation: 'デス'
                },
                {
                    word_id: 2612880,
                    word_type: 'KNOWN',
                    word_position: 9,
                    surface_form: '。',
                    pos: '記号',
                    pos_detail_1: '句点',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: '。',
                    reading: '。',
                    pronunciation: '。'
                }
            ];
            const newTokens = [
                {
                    word_id: 956570,
                    word_type: 'KNOWN',
                    word_position: 1,
                    surface_form: 'これ',
                    pos: '名詞',
                    pos_detail_1: '代名詞',
                    pos_detail_2: '一般',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'これ',
                    reading: 'コレ',
                    pronunciation: 'コレ'
                },
                {
                    word_id: 2595270,
                    word_type: 'KNOWN',
                    word_position: 3,
                    surface_form: 'は',
                    pos: '助詞',
                    pos_detail_1: '係助詞',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'は',
                    reading: 'ハ',
                    pronunciation: 'ワ'
                },
                {
                    word_id: 871450,
                    word_type: 'KNOWN',
                    word_position: 4,
                    surface_form: '日本語',
                    pos: '名詞',
                    pos_detail_1: '一般',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: '日本語',
                    reading: 'ニホンゴ',
                    pronunciation: 'ニホンゴ'
                },
                {
                    word_id: 305080,
                    word_type: 'KNOWN',
                    word_position: 7,
                    surface_form: 'です',
                    pos: '助動詞',
                    pos_detail_1: '*',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '特殊・デス',
                    conjugated_form: '基本形',
                    basic_form: 'です',
                    reading: 'デス',
                    pronunciation: 'デス'
                },
                {
                    word_id: 2612880,
                    word_type: 'KNOWN',
                    word_position: 9,
                    surface_form: '。',
                    pos: '記号',
                    pos_detail_1: '句点',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: '。',
                    reading: '。',
                    pronunciation: '。'
                }
            ];
            const tokenDiff = {
                oldTokens,
                newTokens
            };
            const [match] = MatcherTokenizer.createTokenDiffs(tokenDiff);
            assert.deepEqual(match.oldTokens, [
                {
                    word_id: 956570,
                    word_type: 'KNOWN',
                    word_position: 1,
                    surface_form: 'これ',
                    pos: '名詞',
                    pos_detail_1: '代名詞',
                    pos_detail_2: '一般',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'これ',
                    reading: 'コレ',
                    pronunciation: 'コレ'
                },
                {
                    word_id: 2595180,
                    word_type: 'KNOWN',
                    word_position: 3,
                    surface_form: 'が',
                    pos: '助詞',
                    pos_detail_1: '格助詞',
                    pos_detail_2: '一般',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'が',
                    reading: 'ガ',
                    pronunciation: 'ガ'
                },
                {
                    word_id: 871450,
                    word_type: 'KNOWN',
                    word_position: 4,
                    surface_form: '日本語',
                    pos: '名詞',
                    pos_detail_1: '一般',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: '日本語',
                    reading: 'ニホンゴ',
                    pronunciation: 'ニホンゴ'
                }
            ]);
            assert.deepEqual(match.newTokens, [
                {
                    word_id: 956570,
                    word_type: 'KNOWN',
                    word_position: 1,
                    surface_form: 'これ',
                    pos: '名詞',
                    pos_detail_1: '代名詞',
                    pos_detail_2: '一般',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'これ',
                    reading: 'コレ',
                    pronunciation: 'コレ'
                },
                {
                    word_id: 2595270,
                    word_type: 'KNOWN',
                    word_position: 3,
                    surface_form: 'は',
                    pos: '助詞',
                    pos_detail_1: '係助詞',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: 'は',
                    reading: 'ハ',
                    pronunciation: 'ワ'
                },
                {
                    word_id: 871450,
                    word_type: 'KNOWN',
                    word_position: 4,
                    surface_form: '日本語',
                    pos: '名詞',
                    pos_detail_1: '一般',
                    pos_detail_2: '*',
                    pos_detail_3: '*',
                    conjugated_type: '*',
                    conjugated_form: '*',
                    basic_form: '日本語',
                    reading: 'ニホンゴ',
                    pronunciation: 'ニホンゴ'
                }
            ]);
        });
    });

});