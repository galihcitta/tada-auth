const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())


mongoose.connect('mongodb://127.0.0.1:27017/tadaauth-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('Sucessfully connected to MongoDB!'))
.catch(err => console.log('There was an issue connecting to MongoDB'))

app.use(session({
    secret: 'secrettada',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
}))

app.listen(3000, () => console.log('server started on port 3000'))