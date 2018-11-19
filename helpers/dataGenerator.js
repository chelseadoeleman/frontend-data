const path = require('path')
const flatten = require('lodash.flatten')
const fs = require('fs')
// const basicReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/names.tsv`, 'utf8')
// const filmsReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/title.tsv`, 'utf8')
// const crewReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/crew.tsv`, 'utf8')
// const ratingReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/rating.tsv`, 'utf8')
const basicReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/name.basics.tsv`, 'utf8')
const filmsReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/title.akas.tsv`, 'utf8')
const crewReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/title.crew.tsv`, 'utf8')
const ratingReadStream = fs.createReadStream(`${path.join(__dirname, '../data')}/title.ratings.tsv`, 'utf8')


const getTransformBasicData = (chunk) => {
    return chunk 
        .split(/\n/g)
        .map(person => person.split(/\t/g))
        .map(person => {
            return {
                nameId: person[0],
                name: person[1],
                movies: person[5]
            }
        })
}

const getTransformTitleData = (chunk) => {
    return chunk 
        .split(/\n/g)
        .map(title => title.split(/\t/g))
        .map(title => {
            return {
                titleId: title[0],
                title: title[2]
            }
        })
}

const getTransformCrewData = (chunk) => {
    return chunk 
        .split(/\n/g)
        .map(crew => crew.split(/\t/g))
        .map(crew => {
            return {
                titleId: crew[0],
                producerId: crew[1]
            }
        })
}

const getTransformRatingData = (chunk) => {
    return chunk 
        .split(/\n/g)
        .map(rating => rating.split(/\t/g))
        .map(rating => {
            return {
                titleId: rating[0],
                ratingNumber: rating[1]
            }
        })
}


const getAllResults = async () => {

    const basics = [] 
    const titles = []
    const crews = []
    const ratings = []
    
    await basicReadStream
        .on('data', chunk => {
            basics.push(getTransformBasicData(chunk))
        })
    await filmsReadStream
            .on('data', chunk => {
                titles.push(getTransformTitleData(chunk))
            })
    await crewReadStream
        .on('data', chunk => {
            crews.push(getTransformCrewData(chunk))
        })
    await ratingReadStream
        .on('data', chunk => {
            ratings.push(getTransformRatingData(chunk))
        })
        .on('end', async () => {
            console.log("Start function")
            const flatCrews = flatten(crews)
            const flatBasics = flatten(basics)
            const flatTitles = flatten(titles)
            const flatRatings = flatten(ratings)

            const movies = await flatRatings.map(rating => {
                console.log(rating)
                return {
                    ...rating,
                    ...flatTitles.filter(title => title.titleId === rating.titleId)[0],
                    ...flatCrews.filter(c => rating.titleId === c.titleId)[0]
                }
            })

            const results = await movies.map(movie => {
                console.log(movie)
                return {
                    ...movie,
                    ...flatBasics.filter(b => movie.producerId === b.nameId)[0]
                }
            })

            console.log(results)

            fs.writeFile("imdbData.json", JSON.stringify(results), (err) => err && console.error(err))
        })
}

getAllResults()


