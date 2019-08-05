import { URL_API } from '../utils/Constants';

export const FETCH_POKEMONS_PENDING = 'FETCH_POKEMONS_PENDING';
export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMONS_SUCCESS';
export const FETCH_POKEMONS_ERROR = 'FETCH_POKEMONS_ERROR';



export const fetchPokemonsPending = () => ({
    type: FETCH_POKEMONS_PENDING,
})

export const fetchPokemonsSuccess = result => ({
    type: FETCH_POKEMONS_SUCCESS,
    pokemons: result,
    receivedAt: Date.now()
})

export const fetchPokemonsError = result => ({
    type: FETCH_POKEMONS_ERROR,
    error: result.error
})

export const fetchPokemons = () => dispatch => {
    dispatch(fetchPokemonsPending())
    return fetch(URL_API)
        .then(response => response.json())
        .then(result => dispatch(fetchPokemonsSuccess(result)))

}

const shouldFetchPokemons = (state) => {
    let fetchAllowed = false;
    const pokemons = state.pokemons;

    if (pokemons.length === 0) {
        fetchAllowed = true
    }
    if (state.pending) {
        fetchAllowed = false
    }
    return fetchAllowed;
}

export const fetchPokemonsIfNeeded = () => (dispatch, getState) => {
    if (shouldFetchPokemons(getState())) {
        return dispatch(fetchPokemons())
    }
}