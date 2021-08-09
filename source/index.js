"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decryptor_1 = require("./module/decryptor");
const textparser_1 = require("./module/textparser");
(async () => {
    console.time('app');
    let sumOfAllNumbers = 0;
    let vowelCount = 0;
    let sentencesNumberSum = [];
    await decryptor_1.readDecryptedFile(async (chunk) => {
        sumOfAllNumbers = textparser_1.getSumOfNumbersOfText(chunk) + sumOfAllNumbers;
        vowelCount = textparser_1.getVowelCountWithWeight(chunk) + vowelCount;
        chunk.split(/\.|!|\?/).forEach((sentence) => {
            sentencesNumberSum.push(textparser_1.getSumOfNumbersOfText(sentence));
        });
    });
    console.log(`Sum of all Numbers: ${sumOfAllNumbers}`);
    console.log(`VowelCount: ${vowelCount}`);
    console.log(`Sum of all Numbers plus VowelCount: ${sumOfAllNumbers + vowelCount}`);
    console.timeEnd('app');
})();
