const express = require('express')
const router = express.Router()

const Person = require('../models/Person')

router.get('/people', function (req, res) {
    Person.find({}, function (err, people) {
        res.send(people)
    })
})

router.post('/person', (req, res) => {
    const person = new Person(req.body);

    person.save()
    res.sendStatus(201);
})

router.put('/person/:id', (req, res) => {
    const id = req.params.id;

    Person.findById(`${id}`, (err, person) => {
        person.age = 80;
        person.save();
    })

    res.send('done')
})

router.delete('/apocalypse', async (req, res) => {
    try {
        const result = await Person.deleteMany({});
        const deletedCount = result.deletedCount;

        res.send(`deleted ${deletedCount} documents`)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router
