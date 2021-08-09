import {readDecryptedFile} from "./module/decryptor";
import {getSumOfNumbersOfText, getVowelCountWithWeight} from "./module/textparser";

(async () => {
    console.time('app')
    let sumOfAllNumbers = 0
    let vowelCount = 0
    let sentencesNumberSum: number[] = []
    await readDecryptedFile(async (chunk: string) => {
            sumOfAllNumbers = getSumOfNumbersOfText(chunk) + sumOfAllNumbers
            vowelCount = getVowelCountWithWeight(chunk) + vowelCount
            chunk.split(/\.|!|\?/).forEach((sentence: string) => {
                sentencesNumberSum.push(getSumOfNumbersOfText(sentence))
            })
        }
    );


    console.log(`Sum of all Numbers: ${sumOfAllNumbers}`)
    console.log(`VowelCount: ${vowelCount}`)
    console.log(`Sum of all Numbers plus VowelCount: ${sumOfAllNumbers + vowelCount}`)
    console.timeEnd('app')

})();

