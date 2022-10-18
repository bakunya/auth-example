const UserModel = require('./index')

const all = async () => {
    try {
        const credentials = await UserModel.find({  })
        return Promise.resolve(credentials)
    } catch (er) {
        return Promise.reject(er.message)
    }
}

module.exports = {
    all
}