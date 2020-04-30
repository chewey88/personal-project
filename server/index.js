require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')
const commentCtrl = require('./controllers/commentsController')
const{SERVER_PORT, CONNECTION_STRING,
SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},
        secret: SESSION_SECRET,
    })
)

app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)

app.get('/api/comments', commentCtrl.getComments)
app.post('/api/comments', commentCtrl.addComment)
app.put('/api/comments/:comment_id', commentCtrl.editComment)
app.delete('/api/comments/:comment_id', commentCtrl.deleteComment)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    },
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('db ready')
    app.listen(SERVER_PORT, () => console.log(`Ready to collect on port ${SERVER_PORT}`))
})