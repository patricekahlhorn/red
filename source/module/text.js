"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decipher = exports.buildTextFromCharNumbers = exports.getSentencesWithMostNumbers = exports.getSentences = exports.getNumberOfVowels = exports.getSumOfNumbersOfText = void 0;
const fs_1 = require("fs");
const crypto_1 = require("crypto");
exports.getSumOfNumbersOfText = (text) => {
    var _a;
    const arrayOfStrings = (_a = text.match(/\d/g)) !== null && _a !== void 0 ? _a : [];
    const arrayOfNumbers = arrayOfStrings.map((val) => parseInt(val));
    return arrayOfNumbers.reduce((a, b) => a + b, 0);
};
exports.getNumberOfVowels = (text) => {
    const vowelCount = { 'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0 };
    Object.keys(vowelCount).forEach((val) => {
        var _a;
        const regex = new RegExp(val, "g");
        const vowels = (_a = text.match(regex)) !== null && _a !== void 0 ? _a : [];
        vowelCount[val] = vowels.length;
    });
    return vowelCount;
};
exports.getSentences = (text) => text.split('.');
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
exports.buildTextFromCharNumbers = (topTen) => {
    return String.fromCharCode(...topTen.map((val) => {
        return val[1] - val[0];
    }));
};
exports.decipher = () => {
    const encrypted = fs_1.readFileSync('secret.enc', 'utf8');
    const authTag = fs_1.readFileSync('auth.txt');
    const iv = fs_1.readFileSync('iv.txt');
    const key = fs_1.readFileSync('secret.key');
    const decipher = crypto_1.createDecipheriv('aes-256-gcm', Buffer.alloc(32, key), iv);
    decipher.setAuthTag(authTag);
    var decText = decipher.update(encrypted, 'hex', 'utf8');
    decText += decipher.final('utf8');
    console.log("D: " + decText);
};
