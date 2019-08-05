import { FETCH_POKEMONS_PENDING, FETCH_POKEMONS_SUCCESS, FETCH_POKEMONS_ERROR } from '../actions/'

const initialState = {
    pending: false,
    pokemons: [],
    error: null,
    errorMessage: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEMONS_PENDING:
            return {
                ...state,
                pending: true,
            }
        case FETCH_POKEMONS_SUCCESS:
            return {
                ...state,
                pending: false,
                error: action.error || null,
                errorMessage: action.message || '', 
                pokemons: action.pokemons
            }
        case FETCH_POKEMONS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default rootReducer