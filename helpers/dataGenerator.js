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


const getAllResults = async () => {

    const basics = [] 
    const titles = []
    const crews = []
    const ratings = []
    
    await basicReadStream
        .on('data', chunk => {
            basics.push(getTransformBasicData(chunk))
        })
        .on('end', () => {
            console.log(basics)
        })
        await filmsReadStream
                .on('data', chunk => {
                    titles.push(getTransformTitleData(chunk))
                })
                .on('end', () => {
                    console.log(titles)
                })
        await crewReadStream
        .on('data', chunk => {
            crews.push(getTransformCrewData(chunk))
        })
        .on('end', () => {
            console.log(crews)
        })
        await ratingReadStream
                .on('data', chunk => {
                    ratings.push(getTransformRatingData(chunk))
                })
                .on('end', () => {
                    console.log(ratings)
                })
        

        const getProducerFromNameId = (id) => {
            return basics.nameId.find(nameId => nameId === id)
        }
        
        const getProducerId = crews.map(crew => crew.producerId)

        const transformedProducer = getProducerFromNameId(getProducerId)

        console.log(transformedProducer)
    
        // Connect every id and name to producer id 

        // Hier ga je de data koppelen aan elkaar met filters en maps 
        // (zoeken naar de id in de andere objecten etc., dat lukt je wel)
        // Uiteindelijk wil je denk ik 1 array hebben van omgevormde objecten, 
        // die je dan returnt naar de index.js, zodat je daar vervolgens kunt zoeken 
        // door de data op basis van de data uit de OBA API (wss kom je hier morgen toch pas aan toe).
}

console.log(getAllResults())



