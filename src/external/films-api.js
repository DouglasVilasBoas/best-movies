const axios = require('axios')
require('dotenv').config()

async function getFilmsAPI() {
    try {
        const { data } = await axios.get(process.env.APIFILMES)
        return data
    } catch (error) {
        throw new Error('Error ao buscar filme ', error)
    }
}

module.exports = { getFilmsAPI }