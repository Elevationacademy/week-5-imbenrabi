const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/computerDB', { useNewUrlParser: true, useUnifiedTopology: true });

const computerSchema = new mongoose.Schema({
    maker: { type: String, required: true },
    price: { type: Number, required: true },
    // address: {
    //     city: String,
    //     street: String,
    //     apartment: Number
    // }
})

const Computer = mongoose.model('computer', computerSchema)

// let p1 = new Person({ firstName: "David", lastName: "Smith", age: 25 }) //purposefully ignoring the `address` field
let c1 = new Computer({ maker: 'HP', price: 500 })
let c2 = new Computer({ maker: 'Apple', price: 1000 })

const computers = [c1, c2];

computers.forEach(c => c.save());
