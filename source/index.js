"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const text_1 = require("./module/text");
const http = require("http");
const data = fs_1.readFileSync('clear_smaller.txt', 'utf8');
// console.log(decipher())
console.log(text_1.getSumOfNumbersOfText(data));
console.log(text_1.getNumberOfVowels(data));
const sentencesWithMostNumbers = text_1.getSentencesWithMostNumbers(data);
const text = text_1.buildTextFromCharNumbers(sentencesWithMostNumbers);
console.log(text);
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.writeHead(200);
    res.end(text);
};
const server = http.createServer(requestListener);
server.listen(3000, '127.0.0.1');
