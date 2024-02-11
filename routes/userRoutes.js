const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    res.send('User Route API called')
})

// Register User
router.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});
        await user.save();

        res.status(201).send({user, message: 'User Created'})
    }
    catch (err) {
        res.status(400).send({ error: err });
    }

});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if(!user) {
            throw new Error('User not found')
        }

        const isMAtch = await bcrypt.compare(password, user.password);
        if(!isMAtch) {
            throw new Error('Invalid credentials')
        }

        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET_KEY )

        res.send({user, token, message: "Logged in"})

    }
    catch (err) {

    }

});

module.exports = router;