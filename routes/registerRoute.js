const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/users');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const ifExistsName = await User.findOne({ username });
    const ifExistseMail = await User.findOne({ email });

    if(ifExistsName) {
        return res.status(400).json({ message: 'Username already taken' });
    }
    if(ifExistseMail) {
        return res.status(400).json({ message: 'Email already taken' });
    }       

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hash
    });

    newUser.save()
        .then(user => {
            res.status(200).json({ message: 'User registered successfully' });
        })
        .catch(err => {
            res.status(500).json({ message: 'Error during registration', error: err.message });
        });
});

module.exports = router;