"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentencesWithMostNumbers = exports.getSentences = exports.getVowelCountWithWeight = exports.getSumOfNumbersOfText = void 0;
exports.getSumOfNumbersOfText = function (text) {
    var _a;
    var arrayOfStrings = (_a = text.match(/\d/g)) !== null && _a !== void 0 ? _a : [];
    var arrayOfNumbers = arrayOfStrings.map(function (val) { return parseInt(val); });
    return arrayOfNumbers.reduce(function (a, b) { return a + b; }, 0);
};
exports.getVowelCountWithWeight = function (text) {
    // let vowelCount = 0
    //
    // const weight = {'a': 2, 'e': 4, 'i': 8, 'o': 16, 'u': 32}
    //
    // for (const [key, value] of Object.entries(weight)) {
    //     vowelCount = Array.from(text).filter(letter => letter === key).length * value + vowelCount;
    // }
    //
    // return vowelCount
    var _a;
    var vowelCount = 0;
    var weight = { 'a': 2, 'e': 4, 'i': 8, 'o': 16, 'u': 32 };
    for (var _i = 0, _b = Object.entries(weight); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], value = _c[1];
        var regex = new RegExp(key, "gi");
        var vowels = (_a = text.match(regex)) !== null && _a !== void 0 ? _a : [];
        vowelCount = vowels.length * value + vowelCount;
    }
    return vowelCount;
};
exports.getSentences = function (text) { return text.split(/\.|!|\?/); };
exports.getSentencesWithMostNumbers = function (text) {
    var numberPerSentence = {};
    var i = 0;
    exports.getSentences(text).forEach(function (sentence) {
        numberPerSentence[i] = exports.getSumOfNumbersOfText(sentence);
        i++;
    });
    return Object.entries(numberPerSentence)
        .sort(function (a, b) { return b[1] - a[1]; })
        .splice(0, 10)
        .sort(function (a, b) { return a[0] - b[0]; });
};
