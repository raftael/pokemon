const { getDatabase } = require('./mongo');
const fetch = require('node-fetch');
const collectionName = 'pokemondb';

async function insertPokemon(pokemon) {
    const database = await getDatabase();
    try {
        const { insertedId } = await database.collection(collectionName).insertOne(pokemon);
        return insertedId;
    } catch (err) {
        console.log(err)
    }
}

async function getPokemons() {
    const database = await getDatabase();
    return await database.collection(collectionName)
        .find({})
        .project({ name: 1, id: 1, 'sprites.front_default': 1, _id: 0 })
        .toArray();
}

async function getPokemon(pokemonName) {
    const database = await getDatabase();

    let result = await database.collection(collectionName)
        .findOne({ name: pokemonName });

    if (!result) {
        result = await getPokemonFromPokeApi(pokemonName);
    }
    const pokemon = !result.type ? {
        id: result.id,
        name: result.name,
        sprites: {
            front_default: result.sprites.front_default
        }
    } : {
            error: true,
            message: `Your pokemon ${pokemonName} doesn't exist`,
        };
    return pokemon;
}

async function getPokemonFromPokeApi(name) {
    const urlPokeApi = 'https://pokeapi.co/api/v2/pokemon/' + name;
    return await fetch(urlPokeApi)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            insertPokemon(data);
            return data;
        })
        .catch((err) => {
            return err;
        });
}

module.exports = {
    insertPokemon,
    getPokemon,
    getPokemons,
    getPokemonFromPokeApi
};