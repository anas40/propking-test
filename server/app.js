const express = require('express');
const app = express();
require('dotenv').config();

const cookieParser = require('cookie-parser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken')
const cors = require('cors');

require('./db/start')

const Land = require('./models/land')
const User = require('./models/user')

app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(express.json())
app.use(cookieParser());

function secure(req, res, next) {
    try {

        if (!req.cookies || !req.cookies.jwt) {
            throw new Error();
        }

        const token = req.cookies.jwt;

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                throw new Error();
            }
            req.email = decoded;
            next();
        });
    } catch (error) {
        console.log('Token mismatch');
        res.status(403).send("Not authorized");
    }
}

app.get('/signout',secure, async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.send("Successfully signed out");
    }
    catch (error) {
        console.log("E : ", error.message);
        res.status(400).send("Unable to signout")
    }
});

app.post('/signin', async (req, res) => {
    try {
        if (!req.body) {
            throw new Error('no body');
        }
        const { email,password } = req.body
        if (!email) { throw new Error("Email missing from body") }
        if (!password) { throw new Error("Password missing from body") }

        const user = await User.findOne({email});
        if (user === null) { throw new Error('User already Exist') }
        if (await argon2.verify(user.password, password)) {
            const signedToken = jwt.sign(email, process.env.JWT_SECRET_KEY)
            res.cookie('jwt', signedToken);
            res.send({message:"success",token:signedToken});
        } else {
            throw new Error('Password does not match');
        }
    }
    catch (error) {
        console.log("E : ", error.message);
        res.status(400).send("Failed to signin")
    }
});

app.post('/signup', async (req, res) => {
    try {
        if (!req.body) {
            throw new Error('no body');
        }
        const { email, password } = req.body
        if (!email) { throw new Error("Email missing from body") }
        if (!password) { throw new Error("Password missing from body") }

        const user = await User.findOne({ email });
        if (user !== null) {
            throw new Error('User already Exist')
        }
        const hash = await argon2.hash(password);
        let newUser = new User({ email, password: hash });
        newUser.save()
        res.status(200).send("Signed up Successfully")            
    }
    catch (error) {
        console.log("E : ", error.message);
        res.status(400).send("Failed to signup")
    }
});


// CRUD routes
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

app.post('/',secure, async (req, res) => {
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

app.patch('/',secure, async (req, res) => {
    try {
        const { id,field,update } = req.body
        if (!id) { throw new Error("id missing from body") }
        if (!field) { throw new Error("field missing from body") }
        if (!update) { throw new Error("update value missing from body") }
        const options = {}
        options[field] =update
        const updatedLand = await Land.findByIdAndUpdate(id, options, { new: true });
        const load = JSON.stringify(updatedLand)
        console.log(load);
        res.send(load)
    }
    catch (error) {
        console.log("E : ", error.message);
        res.status(400).send("Unable to update")
    }
});

app.delete('/',secure, async (req, res) => {
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
