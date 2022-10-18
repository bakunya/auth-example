const getConfig = _ => ({
    bcSaltRound: 10,
    expiresJWT: '1h',
    secretJWT: 'neko',
    expiresCookie: 1000 * 60 * 60, // 1 hour,
    domainCookie: 'http://localhost:5173'
})

module.exports = getConfig