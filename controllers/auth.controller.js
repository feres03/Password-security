const User = require('../models/Account')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


exports.Register = async (req, res) => {
    try {
        const found = await User.findOne({ email: req.body.email })
        console.log(found)
        if (found) {
            res.status(400).send({ message: "email already exist try to verify " })
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
            await User.create(req.body)
            res.send({ message: "Ajouté avec succés" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'error!' })
    }
}

exports.Login = async (req, res) => {
    try {
        const found = await User.findOne({ email: req.body.email })
        console.log(found);
        if (found) {
            const validPassword = bcrypt.compareSync(req.body.password, found.password)
            console.log(validPassword);
            if (validPassword) {
                const data = {
                    idUser: found._id
                }
                const token = jwt.sign(data, 'secret', { expiresIn: '1h' })

                res.send({ message: 'You are logged in', token })

            } else {
                res.status(400).send({ message: "Verify your email or password!" })

            }
        }
        else {
            res.status(400).send({ message: "Verify your email or password!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message || 'error!' })
    }
}
