import React from 'react';
import ReactDOM from 'react-dom';
import Items from './Items';

const pokemons = [
    {
        "id": 4,
        "name": "charmander",
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        }
    },
    {
        "id": 25,
        "name": "pikachu",
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
        }
    },
    {
        "id": 26,
        "name": "raichu",
        "sprites": {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png"
        }
    }
  ];

it('renders Items component without crashing', () => {
  const div = document.createElement('div');  
  ReactDOM.render(<Items items={pokemons} />, div);
});

test('Shuld be three pokemons', () => {    
    expect(pokemons.length).toEqual(3);
});