const PostModel = require('./index')

const one = async (credentials) => {
    try {
        await (new PostModel(credentials)).save()
        return Promise.resolve(true)
    } catch (er) {
        return Promise.reject(er.message)
    }
}

module.exports = {
    one
}