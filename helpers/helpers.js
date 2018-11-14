// Shout out naar Maikel voor het helpen

// const _range = require ("lodash.range")
// const fs = require("fs")

// Checks to make sure the results are there in the data and will not unexpectedly break.
const getTitleFromResult = (result) => {
    return result.titles
        && result.titles["short-title"]
        && result.titles["short-title"].$t
        || undefined
}

const getDurationFromResult = (result) => {
    return result.description
        && result.description["physical-description"]
        && result.description["physical-description"].$t
        || undefined
}

const getPublicationYearFromResult = (result) => {
    return result.publication
        && result.publication.year
        && result.publication.year.$t
        && Number(result.publication.year.$t)
        || undefined
}

const getGenreFromResult = (result) => {
    const genres = result.genres
    if (genres) {
        if (genres && genres.genre) {
            const genre = genres.genre
            if (Array.isArray(genre)) {
                return result.genres.genre.map(genre => genre.$t)
            } else {
                return result.genres.genre.$t
            }
        } else {
            return undefined
        }
    } else {
        return undefined
    }
}

const getCoverImageFromResult = (result) => {
    return result.coverimages
        && result.coverimages.coverimage
        && Array.isArray(result.coverimages.coverimage)
            ? result.coverimages.coverimage[0].$t
            : result.coverimages.coverimage.$t || undefined
}

// getPublicationYears from the last 30 years.
const getPublicationYears = () => {
    const currentYear = new Date().getFullYear()
    // Currentyear + 1 because else it wouldn't count past 1 januari 2018
    const publicationYears = _range(currentYear - 10, currentYear + 1)

    return publicationYears
}

// return Name and Gender in a new object.
const getDurationTime = (duration) => {
    const rawDuration = duration.split("(")[1].split(")")[0]
    const transformedDuration = transFormDuration(rawDuration)
    return transformedDuration
}

const transFormDuration = (rawDuration) => {
    // console.log(rawDuration)

    const removeMin = rawDuration.replace(' min.', '')
    const removeAbout = removeMin.replace('ongeveer ', '')
    const removeAbout2 = removeAbout.replace('ca. ', '')
    const timesCode = String.fromCharCode(215)
    const multiplyArray = removeAbout2.indexOf(` ${timesCode} `) !== -1 && removeAbout2.split(` ${timesCode} `)

    // console.log(multiplyArray)

    if (multiplyArray) {
        const firstNumber = Number(multiplyArray[0])
        const secondNumber = Number(multiplyArray[1])

        if (isNaN(secondNumber)) {
            return firstNumber
        }

        return firstNumber * secondNumber
    } else {
        const plusArray = removeAbout2.includes(', ') && removeAbout2.split(", ")
        return plusArray 
            ? plusArray.reduce((acc, curr) => acc + Number(curr), 0)
            : Number(removeAbout2)
    }
    // const replaceMultiply = removeMin.replace('x', '')
    // let duration = descriptionWithDuration && descriptionWithDuration.length && descriptionWithDuration[0]

    // // krijg alleen de tijd van description en pak daarvan de linkerkant
    // let duration = descriptionWithDuration && descriptionWithDuration.length && descriptionWithDuration[0]
    // // begin vanaf het eerstje (
    // const firstHook = duration && duration.indexOf("(")
    // const transformedDuration = removeTokensFromDuration(hasHook, duration, firstHook)

//     const descriptionWithDuration = duration && author.split(")")
//     let duration = descriptionWithDuration && descriptionWithDuration.length && descriptionWithDuration[0]
//     const firstHook = duration && duration.indexOf(")")
//     // When there are no dots return "falsy" so it won't use the following function: getTransformedFirstName
//     const hasHook = firstHook !== -1
//     // Remove tokens from firstname with parameters to use in the that function
//     const transformedDuration = removeTokensFromDuration(hasHook, duration, firstHook)
//     // If there are dots return transformedFirstname else just the firstName 
//     // Add gender to that equation
//     const timeToUse = hasHook ? transformedDuration : duration
//     return {
//         duration: timeToUse,
//     }
        // return getDurationTime
}

// // Remove tokens from duration
// const removeTokensFromDuration = (hasHook, duration, firstHook) => {
    
//     // verwijder alles voor dit haakje (
//     // verander x in *
//     // maak er een nummer van 
//     // gooi het in het nieuwe object

//     // verwijder alles na het eerst haakje
//     // One step back from the first dot
//     const removeStartIndex = hasHook ? firstHook - 1 : undefined

//     const endIndex = duration && duration.length
//     // Remove the tokens and check if the firstName = not undefined
//     const tokensToRemove = duration && removeStartIndex !== undefined && duration.slice(removeStartIndex, endIndex)
//     // Remove space from firstName after removing the tokens
//     const transformedFirstName = tokensToRemove && duration.replace(tokensToRemove, '').trim()
//     return transformedFirstName


//     // const removeStartIndex = hasHook ? firstHook - 1 : undefined

//     // const endIndex = duration && duration.length
//     // // Remove the tokens and check if the firstName = not undefined
//     // const tokensToRemove = duration && removeStartIndex !== undefined && duration.slice(removeStartIndex, endIndex)
//     // // Remove space from firstName after removing the tokens
//     // const transformedFirstName = tokensToRemove && duration.replace(tokensToRemove, '').trim()
//     // return transformedFirstName
// }

// Return new object while mapping over all results to get only the specific result for research
const getTransformedResultFromResults = (results) => {
    return results 
        ? results
            .filter(result => {
                const duration = getDurationFromResult(result)
                return !duration.includes('uur') 
                    && !duration.includes('..')      
            })
            .map(result => ({
                title: getTitleFromResult(result),
                duration: getDurationTime(getDurationFromResult(result)),
                publicationYear: getPublicationYearFromResult(result),
                genre: getGenreFromResult(result),
                coverImage: getCoverImageFromResult(result)
            })) 
        : []
}

// Export the following functions
module.exports = {
    getTransformedResultFromResults,
    getPublicationYearFromResult, 
    getGenreFromResult,
    getDurationTime
    // getGenderFromName, 
    // getNameAndGender,
    // getPublicationYears
}


