const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = app => {
    app.post('/signup', (req, res) => {
        const { username, password } = req.body
        const user = new User({ username, password })

        user.save()
            .then(user => {
                let payload = { username: user.username }
                let secret = process.env.SECRET
                let options = { expiresIn: '1d' }
                let token = jwt.sign(payload, secret, options)
                res.cookie('api_token', token, { maxAge: 900000, httpOnly: true })
                res.redirect('/pics')
            }).catch(err => {
                console.error(err)
            })
    })

    app.post('/login', (req, res) => {
        if (!req.user) {
            const username = req.body.username
            const password = req.body.password
            User.findOne({username}).then(user => {
                bcrypt.compare(password, user.password).then(match => {
                    if (match) {
                        const payload = { user: user.username };
                        const secret = process.env.SECRET;
                        const options = { expiresIn: '1d' };
                        const token = jwt.sign(payload, secret, options);
                        res.cookie('api_token', token, { maxAge: 900000, httpOnly: true })
                        res.redirect('/pics')
                    } else {
                        res.status(401).send({message: 'Could not log in using those credentials'})
                    }
                })
            })
        } else {
            res.status(400).send({message: 'You are already logged in'})
        }
    })

    app.get('/logout', (req, res) => {
        if (req.user){
            res.clearCookie('api_token');
            res.redirect('/pics');
        } else {
            res.status(401).send({message: 'You must be logged in to do that'})
        }
    })
}