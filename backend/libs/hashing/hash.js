const bc = require('bcrypt')
const getConfig = require('./../../config')

const hash = async (plainText) => {
    try {
        const { bcSaltRound } = getConfig()
        const result = await bc.hash(plainText, bcSaltRound)
        return Promise.resolve(result)
    } catch (er) {
        return Promise.reject(er.message)
    }
}

module.exports = hash