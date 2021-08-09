"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentencesWithMostNumbers = exports.getSentences = exports.getVowelCountWithWeight = exports.getSumOfNumbersOfText = void 0;
exports.getSumOfNumbersOfText = (text) => {
    var _a;
    const arrayOfStrings = (_a = text.match(/\d/g)) !== null && _a !== void 0 ? _a : [];
    const arrayOfNumbers = arrayOfStrings.map((val) => parseInt(val));
    return arrayOfNumbers.reduce((a, b) => a + b, 0);
};
exports.getVowelCountWithWeight = (text) => {
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
    let vowelCount = 0;
    const weight = { 'a': 2, 'e': 4, 'i': 8, 'o': 16, 'u': 32 };
    for (const [key, value] of Object.entries(weight)) {
        const regex = new RegExp(key, "gi");
        const vowels = (_a = text.match(regex)) !== null && _a !== void 0 ? _a : [];
        vowelCount = vowels.length * value + vowelCount;
    }
    return vowelCount;
};
exports.getSentences = (text) => text.split(/\.|!|\?/);
exports.getSentencesWithMostNumbers = (text) => {
    const numberPerSentence = {};
    let i = 0;
    exports.getSentences(text).forEach((sentence) => {
        numberPerSentence[i] = exports.getSumOfNumbersOfText(sentence);
        i++;
    });
    return Object.entries(numberPerSentence)
        .sort((a, b) => b[1] - a[1])
        .splice(0, 10)
        .sort((a, b) => a[0] - b[0]);
};
