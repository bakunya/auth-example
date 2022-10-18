const bc = require('bcrypt')

const compare = async (plainText, hashText) => {
    try {
        const result = await bc.compare(plainText, hashText)
        if(!result) return Promise.reject('password is invalid.')
        return Promise.resolve(result)
    } catch (er) {
        return Promise.reject(er.message)
    }
}

module.exports = compare