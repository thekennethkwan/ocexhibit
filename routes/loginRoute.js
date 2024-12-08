const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/users');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if(!user) {
            return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.status(400).json({ message: 'Invalid login' });
    }

    res.json({ 
        message: 'Login successful',
        user
    }); 
});

module.exports = router;