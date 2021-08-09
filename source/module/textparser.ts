
export const getSumOfNumbersOfText = (text: string): number => {
    const arrayOfStrings = text.match(/\d/g) ?? []
    const arrayOfNumbers = arrayOfStrings.map((val: string) => parseInt(val))
    return arrayOfNumbers.reduce((a: number, b: number) => a + b, 0)
}

export const getVowelCountWithWeight = (text: string): number => {
    // let vowelCount = 0
    //
    // const weight = {'a': 2, 'e': 4, 'i': 8, 'o': 16, 'u': 32}
    //
    // for (const [key, value] of Object.entries(weight)) {
    //     vowelCount = Array.from(text).filter(letter => letter === key).length * value + vowelCount;
    // }
    //
    // return vowelCount

    let vowelCount = 0

    const weight = {'a': 2, 'e': 4, 'i': 8, 'o': 16, 'u': 32}

    for (const [key, value] of Object.entries(weight)) {
        const regex = new RegExp(key, "gi")
        const vowels = text.match(regex) ?? []

        vowelCount = vowels.length * value + vowelCount
    }

    return vowelCount
}

export const getSentences = (text: string) : string[] => text.split(/\.|!|\?/)

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