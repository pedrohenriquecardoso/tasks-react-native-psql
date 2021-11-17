//const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
require('dotenv').config()

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email){
            return res.status(400).send('inform the email')
        } else if (!req.body.password){
            return res.status(400).send('inform the password')
        }

        const user = await app.db('users')
            .where({email: req.body.email})
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch){
                    return res.status(401).send()
                }
                const payload = {id: user.id}
                return res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, process.env.DB_AUTH),
                })
            })
        } else {
            return res.status(400).send('Error, user not found')
        }
    }
    return {signin}
}