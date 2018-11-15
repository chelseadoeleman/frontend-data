const path = require('path')
const fs = require('fs')
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


const getAllResults = () => {
    const basics = [] 
    basicReadStream
        .on('data', chunk => {
            basics.push(getTransformBasicData(chunk))
        })
        .on('end', async () => {
            console.log(basics)
            const title = []
            filmsReadStream
                .on('data', chunk => {
                    title.push(getTransformTitleData(chunk))
                })
                .on('end', async () => {
                    console.log(title)
                    const crew = []
                    crewReadStream
                        .on('data', chunk => {
                            crew.push(getTransformCrewData(chunk))
                        })
                        .on('end', async () => {
                            console.log(crew)
                            const rating = []
                            ratingReadStream
                                .on('data', chunk => {
                                    rating.push(getTransformRatingData(chunk))
                                })
                                .on('end', async () => {
                                    console.log(rating)
                                })
                                })
                        })
        })
        return basics
}

(async () => {
    
})


// (async () => {
// const wstream = fs.createWriteStream('transformBasicData.json')

// for await (const chunk of basicReadStream) {
//     wstream.write(JSON.stringify(getTransformBasicData(chunk)))
// }

// wstream.end()
// })()



