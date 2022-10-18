const UserModel = require('./index')

const byEmail = async (email) => {
    try {
        const credentials = await UserModel.findOne({ email })
        return Promise.resolve(credentials)
    } catch (er) {
        return Promise.reject(er.message)
    }
}

module.exports = {
    byEmail
}