const filmsApi = require('../external/films-api')

function convertStringToNumber(text) {

    const regex = /([\d,.]+)\s*(milhão|milhões|bilhão|bilhões|mil)/i
    const match = text.match(regex)

    if (!match) return null

    const numberToConvert = match[1]
        .replace(/\./g, '')
        .replace(',', '.')

    const number = Number(numberToConvert)

    const unit = match[2].toLowerCase()

    if (unit === 'mil') return number * 1_000
    if (unit === 'milhão' || unit === 'milhões') return number * 1_000_000
    if (unit === 'bilhão' || unit === 'bilhões') return number * 1_000_000_000


    return number
}

function convertNumberToString(number) {

    if (number >= 1_000_000_000) {
        const value = number / 1_000_000_000
        const unit = value === 1 ? 'bilhão' : 'bilhões'
        return `$${value} ${unit}`
    }
    if (number >= 1_000_000) {
        const value = number / 1_000_000
        const unit = value === 1 ? 'milhão' : 'milhões'
        return `$${value} ${unit}`
    }
    if (number >= 1_000) {
        return `$${value} mil`
    }
    return `$${number}`

}

function calculateProfit(budgetTxt, boxOfficeTxt) {

    const budget = convertStringToNumber(budgetTxt)
    const boxOffice = convertStringToNumber(boxOfficeTxt)

    const proft = boxOffice - budget

    return convertNumberToString(proft)

}


function getHigherAward(awardList) {

    return awardList.sort((awardA, awardB) => awardB.relevancia - awardA.relevancia)[0].nome

}


function getSynopsis(synopsisList) {

    const hasPtIdiom = synopsisList.find(({ idioma }) => idioma === 'pt-br')
    if (hasPtIdiom) {
        return hasPtIdiom.texto
    }
    const hasEnIdiom = synopsisList.find(({ idioma }) => idioma === 'en')
    if (hasEnIdiom) {
        return hasEnIdiom.texto
    }
    return synopsisList[0].texto

}

module.exports = {
    getFilms: async () => {
        const { filmes } = await filmsApi.getFilmsAPI()

        return filmes.map(film => {
            return {
                titulo: film.titulo,
                ano: film.ano,
                diretor: film.diretor,
                genero: film.genero,
                duracaoSegundos: film.duracao * 60,
                notaIMDb: film.ratings.find(rating => rating.fonte === 'IMDb').valor.toString(),
                lucro: calculateProfit(film.orcamento, film.bilheteria),
                maiorPremiacao: getHigherAward(film.premios),
                sinopse: getSynopsis(film.sinopse)
            }
        })

    }
}

