const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const readline = require('readline') // Temp for testing inputs

const User = require('./users')
const Exhibit = require('./exhibits')

mongoose.connect('mongodb://localhost:27017/ocexhibit')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function createUsers() {
    rl.question('Enter your name: ', (name) => {
        rl.question('Enter your email: ', (email) => {
            rl.question('Enter your password: ', async (password) => {
                const hash = await bcrypt.hash(password, 10)
                const user = new User({
                    name: name,
                    email: email,
                    password: hash
                })
                user.save()
                console.log(user)

                const isMatch = await bcrypt.compare("Password1", hash)
                console.log(isMatch)

                rl.close()
            })
        })
    })
};

createUsers()


//const hash = await bcrypt.hashSync(password, 10)


// console.log(user)
// console.log(exhibit)