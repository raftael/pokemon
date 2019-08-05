import React from 'react';
import { connect } from 'react-redux';
import { fetchPokemonsIfNeeded } from '../../actions';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import Menu from '../Menu/Menu'
import Search from '../Search/Search'
import Placeholder from '../Placeholder/Placeholder'
import ErrorAlert from '../Placeholder/Error'
import Items from '../Items/Items'

import { URL_API } from '../../utils/Constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchPokemon = this.searchPokemon.bind(this);
  }

  componentDidMount() {
    const { fetchPokemonsIfNeeded } = this.props;
    fetchPokemonsIfNeeded();
  }

  existPokemon(name) {
    return this.props.pokemons.some(element => element.name.toLowerCase() === name.toLowerCase());
  }

  searchPokemon(name) {
    if (!this.existPokemon(name)) {
      this.setState({ pending: true });
      const urlApi = URL_API + name
      fetch(urlApi)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState(state => {
              const items = result.error ? [...state.pokemons] : [...state.pokemons, result];
              return {
                pending: false,
                error: result.error,
                errorMessage: result.message || '',
                items
              }
            });
          },
          (error) => {
            this.setState({
              message: 'Error trying to get your Pokemon!',
              error: true
            });
          }
        );
    }
  }

  render() {
    const { pokemons, pending, error, errorMessage } = this.props;
    const spinner = pending ? <Spinner animation="grow" variant="info" /> : null;
    const pokemonsList = pokemons.length === 0 ? <Placeholder /> : <Items items={pokemons} />
    const errorAlert = error ? <ErrorAlert message={errorMessage} /> : null;
    return (
      <Container>
        <Menu />
        <Search searchPokemon={this.searchPokemon} />
        <main>
          <Row>
            <Col lg={true}>
              {spinner}
              {errorAlert}
              {pokemonsList}
            </Col>
          </Row>
        </main>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  errorMessage: state.errorMessage,
  pending: state.pending,
  pokemons: state.pokemons
});

export default connect(
  mapStateToProps,
  { fetchPokemonsIfNeeded }
)(App)

