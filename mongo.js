const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name1 = process.argv[3]
const number1 = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.4wka8jy.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name1,
  number: number1
})

if (name1 && number1) {
  person.save().then(() => {
    console.log(`added ${name1} number ${number1} to phonebook`)
    mongoose.connection.close()
  })
} else if (!name1 && !number1) {
  Person.find({}).then(phonebook => {
    console.log('phonebook')
    phonebook.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}