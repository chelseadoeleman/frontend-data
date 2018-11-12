// Shout out naar Maikel voor het helpen

const _range = require ("lodash.range")
const fs = require("fs")

// Checks to make sure the results are there in the data and will not unexpectedly break.
const getAuthorFromResult = (result) => {
    return result.authors
        && result.authors["main-author"]
        && result.authors["main-author"].$t
        || undefined
}

const getPublisherFromResult = (result) => {
    return result.publication
        && result.publication.publishers
        && result.publication.publishers.publisher
        && result.publication.publishers.publisher.$t
        || undefined
}

const getPublicationYearFromResult = (result) => {
    return result.publication
        && result.publication.year
        && result.publication.year.$t
        && Number(result.publication.year.$t)
        || undefined
}

const getLanguageFromResult = (result) => {
    return result.languages
        && result.languages.language
        && result.languages.language.$t
        || undefined
}

// getPublicationYears from the last 30 years.
const getPublicationYears = () => {
    const currentYear = new Date().getFullYear()
    // Currentyear + 1 because else it wouldn't count past 1 januari 2018
    const publicationYears = _range(currentYear - 30, currentYear + 1)

    return publicationYears
}

// Shout out naar Wouter 
const getFilterdGender = {};

// Check if the name is male of female or maybe can't even be identified
const getGenderFromName = (firstname) => {
	if (Object.keys(getFilterdGender ).length <= 0) {
		Object.assign(getFilterdGender , JSON.parse(fs.readFileSync(__dirname + "/../data/names.json", "utf8")));
	}
	const man = getFilterdGender .mannen.find(name => name === firstname);
    const vrouw = getFilterdGender .vrouwen.find(name => name === firstname);
	if (!(man || vrouw) || man && vrouw) return null;
	return (man && "Man") || (vrouw && "Vrouw");
}

// return Name and Gender in a new object.
const getNameAndGender = (author) => {
    const authorFirstNameLastName = author && author.split(", ")
    let firstName = authorFirstNameLastName && authorFirstNameLastName.length && authorFirstNameLastName[1]
    const firstDot = firstName && firstName.indexOf(".")
    // When there are no dots return "falsy" so it won't use the following function: getTransformedFirstName
    const hasDots = firstDot !== -1
    // Remove tokens from firstname with parameters to use in the that function
    const transformedFirstName = getTransformedFirstName(hasDots, firstName, firstDot)
    // If there are dots return transformedFirstname else just the firstName 
    // Add gender to that equation
    const nameToUse = hasDots ? transformedFirstName : firstName
    return {
        name: nameToUse,
        // call the following function, to see what gender belongs to that name
        gender: getGenderFromName(nameToUse),
    }
}

// Remove tokens from firstname 
const getTransformedFirstName = (hasDots, firstName, firstDot) => {
    // One step back from the first dot
    const removeStartIndex = hasDots ? firstDot - 1 : undefined
    const endIndex = firstName && firstName.length
    // Remove the tokens and check if the firstName = not undefined
    const tokensToRemove = firstName && removeStartIndex !== undefined && firstName.slice(removeStartIndex, endIndex)
    // Remove space from firstName after removing the tokens
    const transformedFirstName = tokensToRemove && firstName.replace(tokensToRemove, '').trim()
    return transformedFirstName
}

// Return new object while mapping over all results to get only the specific result for research
const getTransformedResultFromResults = (results) => {
    return results 
        ? results.map(result => ({
            author: getAuthorFromResult(result),
            publisher: getPublisherFromResult(result),
            publicationYear: getPublicationYearFromResult(result),
            language: getLanguageFromResult(result)
        })) 
        : []
}

// Export the following functions
module.exports = {
    getTransformedResultFromResults, 
    getPublicationYearFromResult, 
    getGenderFromName, 
    getNameAndGender,
    getPublicationYears
}


