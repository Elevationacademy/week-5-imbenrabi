const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/solar-system", { useNewUrlParser: true });

const solarSystemSchema = new Schema({
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    starName: String
})

const planetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'System' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }]
})

const visitorSchema = new Schema({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'Planet' },
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
})

const System = mongoose.model("System", solarSystemSchema);
const Planet = mongoose.model("Planet", planetSchema);
const Visitor = mongoose.model("Visitor", visitorSchema);

let s1 = new System({
    starName: "Adam Ten",
    planets: []
})

let p1 = new Planet({
    name: 'Mita Gami',
    system: s1,
    visitors: []
})

let p2 = new Planet({
    name: 'Gorovich',
    system: s1,
    visitors: []
})

let p3 = new Planet({
    name: 'Dekel',
    system: s1,
    visitors: []
})

let v1 = new Visitor({
    name: 'Lir Marely',
    homePlanet: p1,
    visitedPlanets: p3
})

let v2 = new Visitor({
    name: 'Bat Maman',
    homePlanet: p1,
    visitedPlanets: p2
})

// const pArray = [p1, p2, p3];
// pArray.forEach(p => s1.planets.push(p));

// p2.visitors.push(v2);
// p3.visitors.push(v1);

// const varsArray = [s1, p1, p2, p3, v1, v2];
// varsArray.forEach(v => v.save());

Visitor.find({})
    .populate('visitedPlanets')
    .then((visitors) => {
        console.log('====visitors====');
        console.log(visitors);
    }).catch((err) => {
        console.log(err);
    })

Planet.find({})
    .populate('visitors')
    .then((planets) => {
        console.log('====planets====');
        console.log(planets);
    }).catch((err) => {
        console.log(err);
    })

System.find({})
    .populate({
        path: 'planets',
        populate: {
            path: 'visitors'
        }
    }).then((system) => {
        console.log('====system====');
        console.log(system);
        system[0].planets.forEach(planet => {
            console.log(planet);
        });

    }).catch((err) => {
        console.log(err);
    })





