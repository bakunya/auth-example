const getConfig = require("./../../config");

const create = (httpResponse, cookieKey, cookieVal) => {
    const { expiresCookie, domainCookie } = getConfig()
    httpResponse.header('Content-Type', 'application/json;charset=UTF-8')
    httpResponse.header('Access-Control-Allow-Credentials', true)
    httpResponse.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    return httpResponse.cookie(cookieKey, cookieVal, { domain: domainCookie, sameSite: 'none', maxAge: expiresCookie, httpOnly: true })
};

module.exports = create