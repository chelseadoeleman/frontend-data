// Shout out naar Folkert, Dennis en Daniël van de Velde
require("dotenv").config()

const fs = require("fs")
const chalk = require("chalk")
const express = require("express")
const app = express()
const port = 3000
const helpers = require("./helpers/helpers.js")
const obaWrapper = require("node-oba-api-wrapper")

const obaApi = new obaWrapper({
	public: process.env.PUBLIC,
    secret: process.env.SECRET
})

// Parameters in search
const search = async (q, facet) => {
  	return await obaApi.get("search", {
  	  	q,
		librarian: true,
		// Always needs to be true
		refine: true,
		facet,
		// Return amount of results 
		count: 20,
		// filter: (result) => {
		// 	// const publicationYear = helpers.getPublicationYearFromResult(result)
		// 	// const currentYear = new Date().getFullYear()

		// 	// // filter on publicationYear from the last 30 years
		// 	// return publicationYear >= currentYear - 200
		// }
  	})  
}

// Shout out naar Maikel
(async () => {
	try {
		const results = await search("language:eng", "type(movie)")
		// ("harry potter", ["type(book)", "auteur(J.K. Rowling)"])
		// meerdere facetten toevoegen thanks to Jessie

		if (results) {
			// Return a new object with specific results
			const transformedResults = helpers.getTransformedResultFromResults(results)
			// get all the authors from transformedResults
			const title = transformedResults.map(result => result.title)
			// Map over authors to get the gender of every author
			// const transformedAuthors = authors.map(helpers.getNameAndGender)
			
			// // Create new a new array with all the author names and belonging gender
			// const filterTransformedAuthors = transformedAuthors.filter(transformedAuthor => {
			// 	return transformedAuthor.name && transformedAuthor.gender
			// })

			// // Get the gender from every year by mapping over getPublicationYears in a specific range
			// const getGenderFromYear = helpers.getPublicationYears().map(year => {
			// 	// Get the results for every specific year within that range
			// 	const resultsByYear = transformedResults.filter(result => result.publicationYear === year) 
			// 	// Map over results from resultsByYear to get the specific author and create an new array
			// 	// with the author and gender
			// 	const gendersAndNames =	resultsByYear
			// 		.map(result => helpers.getNameAndGender(result.author))
			// 		.filter(result => result.name && result.gender)
				
			// 	// Get the amount of genders in that specific year
			// 	const amountOfMen = gendersAndNames.filter(genderAndName => genderAndName.gender === "Man").length
			// 	const amountOfWomen = gendersAndNames.filter(genderAndName => genderAndName.gender === "Vrouw").length
			// 	// New Object to create a new data structure to use for the visualization
			// 	return {
			// 		// Year is specified as an string
			// 		category: year.toString(),
			// 		values: [
			// 			{
			// 				gender: "men",
			// 				value: amountOfMen,
			// 			},
			// 			{
			// 				gender: "women",
			// 				value: amountOfWomen,
			// 			},
			// 		]
			// 	}
			// })

			console.log(transformedResults)

			// console.log(getGenderFromYear)
			// console.log(filterTransformedAuthors)
			// console.log(transformedResults)
			// console.log(results)


			// Get results in localhost on port 3000 
			app.get("/", (req, res) => res.json(transformedResults))
			app.listen(port, () => console.log(chalk.green(`Listening on port ${port}`)))
			// Write results to data.json
			// fs.writeFile("data.json", JSON.stringify(getGenderFromYear), (err) => err && console.error(err))
		}
	} catch (error) {
		throw new Error(error)
	}
})()

