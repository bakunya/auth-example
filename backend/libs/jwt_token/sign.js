const jwt = require('jsonwebtoken')
const getConfig = require("./../../config")

const sign = (data) => new Promise((res, rej) => {
    const { secretJWT, expiresCookie } = getConfig()
    jwt.sign(data, secretJWT, { expiresIn: expiresCookie }, (er, re) => {
        if(er) return rej(er)
        return res(re)
    })
})

module.exports = sign