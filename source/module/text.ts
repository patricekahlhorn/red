import {createReadStream, createWriteStream, readFileSync} from "fs";
import {createDecipheriv} from "crypto";
import {createGunzip} from "zlib";

export const getSumOfNumbersOfText = (text: string) => {
    const arrayOfStrings = text.match(/\d/g) ?? []
    const arrayOfNumbers = arrayOfStrings.map((val: string) => parseInt(val))
    return arrayOfNumbers.reduce((a: number, b: number) => a + b, 0)
}

export const getNumberOfVowels = (text: string) => {
    const vowelCount = {'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0}
    Object.keys(vowelCount).forEach((val: string) => {
        const regex = new RegExp(val, "g")
        const vowels = text.match(regex) ?? []

        vowelCount[val] = vowels.length
    })

    return vowelCount

}

export const getSentences = (text: string) => text.split('.')

export const getSentencesWithMostNumbers = (text:string) => {
    const numberPerSentence = {}
    let i = 0;
    getSentences(text).forEach((sentence:string) => {
        numberPerSentence[i] = getSumOfNumbersOfText(sentence)
        i++
    })

    return Object.entries(numberPerSentence)
        .sort((a, b) => b[1] - a[1])
        .splice(0,10)
        .sort((a, b) => a[0] - b[0])

}

export const buildTextFromCharNumbers = (topTen) => {
    return String.fromCharCode(...topTen.map((val) => {
        return val[1]-val[0]
    }))
}

export const decipher = () => {
    const encrypted = readFileSync('secret.enc', 'utf8')
    const authTag = readFileSync('auth.txt', )
    const iv = readFileSync('iv.txt', )
    const key = readFileSync('secret.key', 'utf8')

    const decipher = createDecipheriv('aes-256-gcm', key.substr(0, 32), iv);
    decipher.setAuthTag(authTag);


    return decipher
}