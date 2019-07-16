import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import Menu from './components/Menu/Menu'
import Search from './components/Search/Search'
import Placeholder from './components/Placeholder/Placeholder'
import ErrorAlert from './components/Placeholder/Error'
import Items from './components/Items/Items'

import { URL_API } from './utils/Constants'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: '',
      searching: false,
      items: []
    };

    this.searchPokemon = this.searchPokemon.bind(this);
  }

  existPokemon(name) {
    const pokemon = this.state.items.find(element => element.name.toLowerCase() === name.toLowerCase());
    return pokemon ? true : false;
  }

  searchPokemon(name) {
    if (!this.existPokemon(name)) {
      this.setState({ searching: true });
      const urlApi = URL_API + name
      fetch(urlApi)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState(state => {            
              const items = result.error ? [...state.items] : [...state.items,result];
              return {
                searching: false,
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
    const { items, searching, error, errorMessage } = this.state;
    const spinner = searching ? <Spinner animation="grow" variant="info" /> : null;
    const pokemons = items.length === 0 ? <Placeholder /> : <Items items={items} />
    const errorAlert= error ? <ErrorAlert message={errorMessage} /> : null;
    return (
      <Container>
        <Menu />        
        <Search searchPokemon={this.searchPokemon} />          
        <main>
        <Row>
          <Col lg={true}>
              {spinner}
              {errorAlert}
              {pokemons}
          </Col>
        </Row>
        </main>
      </Container>
    )
  }
}

export default App;
