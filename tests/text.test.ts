import {getSumOfNumbersOfText, getVowelCountWithWeight} from '../source/module/textparser'

test('test sum', () => {
    expect(getSumOfNumbersOfText('D1es 1st 31n Te4t')).toEqual(10)
});

test('test Vowel weight', () => {
    expect(getVowelCountWithWeight('aeiouAEIOU')).toEqual(124)
});