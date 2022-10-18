const jwt = require('jsonwebtoken')
const getConfig = require('./../../config')

const verify = (token) => new Promise((res, rej) => {
    const { secretJWT } = getConfig()
    jwt.verify(token, secretJWT, (er, re) => {
        if(er) return rej(er)
        return res(re)
    })
})

module.exports = verify