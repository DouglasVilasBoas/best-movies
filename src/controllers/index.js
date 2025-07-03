const useCases = require('../useCases')

module.exports = {
    getFilms: async (req, res) => {

        const result = await useCases.getFilms()
        return res.send(result)

    }
}