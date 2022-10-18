const verify = require("./../libs/jwt_token/verify")

const shouldAuth = async (rq, rs, next) => {
    try {
        const token = rq.headers['authorization']
        if(!token) return rs.status(401).end()
        const isTokenValid = await verify(token.split('Bearer ').pop())
        if(!isTokenValid) {
            cookies.destroy(rs, 'token')
            if(!token) return rs.status(401).end()
        }
        next()
    } catch(er) {
        return rs.status(500).send('server error')
    }
}

module.exports = shouldAuth