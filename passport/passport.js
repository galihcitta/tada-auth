const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models/user')
const bcrypt = require('bcrypt')

const opts = {
    usernameField: 'email',
    passwordField: 'password'
}

passport.use(new LocalStrategy(options, (email, password, done) => {
    db.User.findOne({ email: email }, (err, user) => {
        if (err) return done(err)

        if (!user) {
            return done(null, false)
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false)
        }
        return done(null, user)
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    db.User.findById({ _id: id }, (err, user) => {
        if (err) return done(err)
        done(null, user)
    })
})

module.exports = passport