const destroy = (httpRespnse, cookieKey) => httpRespnse.cookie(cookieKey, '', { maxAge: 0, httpOnly: true });

module.exports = destroy