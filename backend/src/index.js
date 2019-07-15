const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { startDatabase } = require('./database/mongo');
const { insertPokemon, getPokemons, getPokemon, getPokemonFromPokeApi } = require('./database/pokemon');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// return all pokemons
app.get('/api/', async (req, res) => {
    res.send(await getPokemons());
});

// get a pokemon by name
app.get('/api/:name', async (req, res) => {    
    const pokemon = await getPokemon(req.params.name.toLowerCase());
    res.send(pokemon);
});

//add pokemon
app.post('/api/', async (req, res) => {
    const newPokemon = req.body;
    await insertPokemon(newPokemon);
    res.send({ message: 'New pokemon inserted.' });
});

startDatabase().then(async () => {
    // start the server
    app.listen(3001, async () => {
        console.log('listening on port 3001');
    });
});