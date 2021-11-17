const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
require('dotenv').config()

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Invalid data')
        }

        const user = await app.db('users')
            .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send('Invalid password')
                }

                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, process.env.DB_AUTH),
                })
            })
        } else {
            res.status(400).send('User not found!')
        }
    }

    return { signin }
}