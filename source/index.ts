import {readFileSync} from "fs";
import {
    getSumOfNumbersOfText,
    getNumberOfVowels,
    getSentencesWithMostNumbers,
    buildTextFromCharNumbers, decipher
} from "./module/text";
const http = require("http");

const data = readFileSync('clear_smaller.txt', 'utf8')
// console.log(decipher())

console.log(getSumOfNumbersOfText(data))
console.log(getNumberOfVowels(data))
const sentencesWithMostNumbers = getSentencesWithMostNumbers(data)
const text = buildTextFromCharNumbers(sentencesWithMostNumbers)
console.log(text)

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.writeHead(200);
    res.end(text);
};

const server = http.createServer(requestListener);
server.listen(3000, '127.0.0.1');