import {getSumOfNumbersOfText}  from '../source/module/text'

test('test sum', () => {
    expect(getSumOfNumbersOfText('D1es 1st 31n Te4t')).toEqual(10)
});