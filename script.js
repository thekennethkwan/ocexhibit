const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const readline = require('readline') // Temp for testing inputs

const Event = require('./models/events')

mongoose.connect('mongodb://localhost:27017/ocexhibit')

const newEvent = new Event({
    name: "asdf",
    date: new Date(),
    url: "asdf",
    address: "123 ur mom",
    asdf: "hello",
    hello: "hello"
  });

newEvent.save()