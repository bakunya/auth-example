const UserModel = require('./index')

const byId = async (id) => {
    try {
        await UserModel.deleteOne({ _id: id })
        return Promise.resolve()
    } catch (er) {
        return Promise.reject(er.message)
    }
}

module.exports = {
    byId
}