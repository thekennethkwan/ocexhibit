const mongoose = require('mongoose')

const User = require('./users')
const Exhibit = require('./exhibits')

mongoose.connect('mongodb://localhost:27017/ocexhibit')

const user = new User({
    name: 'John Doe',
    age: 25,
    email: 'email@gmail.com'
})
user.save()

const exhibit = new Exhibit({
    name: 'Art Exhibit',
    description: 'An exhibit of art',
    address: '123 Main St.',
    date: new Date(),
    price: 10
})
exhibit.save()


console.log(user)
console.log(exhibit)