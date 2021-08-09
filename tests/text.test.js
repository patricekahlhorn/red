"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textparser_1 = require("../source/module/textparser");
test('test sum', function () {
    expect(textparser_1.getSumOfNumbersOfText('D1es 1st 31n Te4t')).toEqual(10);
});
