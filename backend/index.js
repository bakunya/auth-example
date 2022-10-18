const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const hash = require('./libs/hashing/hash')
const cookieParser = require('cookie-parser')
const sign = require('./libs/jwt_token/sign')
const compare = require('./libs/hashing/compare')
const shouldAuth = require('./middleware/shouldAuth')
const getUser = require('./repositories/models/User/getUser')
const getPost = require('./repositories/models/Post/getPost')
const saveUser = require('./repositories/models/User/saveUser')
const savePost = require('./repositories/models/Post/savePost')
const deletePost = require('./repositories/models/Post/deletePost')

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/', shouldAuth, async (rq, rs) => {
    try {
        rs.status(200).send('Hello World')
    } catch(er) {
        console.log(er)
        return rs.status(500).send('server error')
    }
})

app.get('/post/all', shouldAuth, async (rq, rs) => {
    try {
        const posts = await getPost.all()
        return rs.status(200).json(posts)
    } catch(er) {
        console.log(er)
        return rs.status(500).send('server error')
    }
})

app.post('/post', shouldAuth, async (rq, rs) => {
    try {
        await savePost.one(rq.body)
        return rs.status(201).send({ status: 'success' })
    } catch (er) {
        console.log(er)
        rs.status(500).send('server error')
    }
})

app.post('/login', async (rq, rs) => {
    try {
        const credentials = await getUser.byEmail(rq.body.email)
        if(!credentials) return rs.status(404).end()
        await compare(rq.body.password, credentials.password)
        const token = await sign({ email: credentials.email })
        return rs.status(201).send({
            status: 'success',
            token: token
        })
    } catch (er) {
        console.log(er)
        rs.status(500).send('server error')
    }
})

app.post('/register', async (rq, rs) => {
    try {
        const password = await hash(rq.body.password)
        const credentials = { ...rq.body, password }
        await saveUser.one(credentials)
        const token = await sign({ email: credentials.email })
        return rs.status(201).send({
            status: 'registered',
            token: token
        });
    } catch(er) {
        console.log(er)
        return rs.status(500).send('server error');
    }
})

app.delete('/post/:id', shouldAuth, async (rq, rs) => {
    try {
        await deletePost.byId(rq.params.id)
        return rs.status(201).send({ status: 'success' })
    } catch (er) {
        console.log(er)
        rs.status(500).send('server error')
    }
})

mongoose
    .connect('mongodb://127.0.0.1:27017/node-auth')
    .then(_ => app.listen(8000, _ => console.log('run on port 8000')))
    .catch(e => console.log(e.message))