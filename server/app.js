const express = require('express');
const app = express();

require('./db/start')
app.use(express.json())

const Land = require('./models/land')

// route
app.get('/', async (req, res) => {
    try {
        const allLand = await Land.find({});
        const load = JSON.stringify(allLand);
        res.send(load)
    }
    catch (error) {
        console.log("E : ",error.message);
        res.status(400).send("Unable to fulfill request")
    }
});

app.post('/', async (req, res) => {
    try {
        const { name, area, city, state, country } = req.body
        if(!name){throw new Error("Name missing from body")}
        if (!area) { throw new Error("Area missing from body")}
        if (!city) { throw new Error("City missing from body")}
        if (!state) { throw new Error("State missing from body")}
        if (!country) { throw new Error("Country missing from body") }
        
        const land = new Land({
            name,area,city,state,country
        })
        await land.save();
        res.status(200).send("Land saved Successfully")
    }
    catch (error) {
        console.log("E : ",error.message);
        res.status(400).send("Failed to save Land")
    }
});
app.patch('/', async (req, res) => {
    try {
        const land = new Land({

        })
        await land.save();
        res.send(land.toJSON({ virtual: true }))
    }
    catch (error) {
        console.log("E : ", error.message);
        res.status(400).send("Unable to update")
    }
});
app.delete('/', async (req, res) => {
    try {
        const { id } = req.body
        if (!id) { throw new Error("id missing from body") }
        await Land.findByIdAndDelete(id);
        res.send("Land deleted Successfully")
    }
    catch (error) {
        console.log("E : ", error.message);
        res.status(400).send("Unable to delete")
    }
});

// Listening to the port
const Port = process.env.Port || 3000
app.listen(Port, () => {
    console.log(`Listening on ${Port}`);
})
