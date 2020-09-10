const db = require('../models/user')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const capitalize = require('../utils/capitalize')
const validEmail = require('../utils/validEmail')

module.exports = {
    login: (req, res) => {
        let { name, id } = req.user
        res.status(200).json({ success: true, user: `${capitalize(name)}`, id: id, isAuthenticated: true })
    },
    logout: (req, res) => {
        req.logout()
        res.status(200).json({ success: true, message: "Successfully logged out" })
    },
    register: (req, res) => {
        let { email, password, name } = req.body

        if (!email || !password || !name) {
            res.status(400).json({ success: false, message: "Please complete all required fields." })
        }

        if (!validEmail(email)) {
            res.status(400).json({ success: false, message: "Please enter a valid email address." })
        }

        db.User.findOne({ email: email })
        .then(user => {
            if(user) {
                res.status(400).json({ success: false, message: "That email is already in use." })
            }

            let newUser = new db.User({
                email,
                password,
                ...req.body
            })

            bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash

                    newUser.save()
                    .then(() => {
                        res.status(201).json({success: true, message: "Account successfully created."})
                    })
                    .catch(err => {
                        res.status(500).json({success: false, message: "Server Issue: Unable to create account!"})
                    })
                })
            })
        })
        .catch(err => {
            res.status(500).json({success: false, message: "Internal server issue!"})
        })
    },
    authStatus: (req, res) => {
        let { name, id } = req.user
        res.status(200).json({ success: true, user:`${capitalize(name)}`, id: id, isAuthenticated: true })
    }
}

