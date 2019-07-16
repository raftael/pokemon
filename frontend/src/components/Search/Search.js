import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.fetchPokemon = this.fetchPokemon.bind(this);
        
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    fetchPokemon() {
        const { value } = this.state;
        if(value) {
            this.props.searchPokemon(value)
        }                
        this.setState({ value: '' });
    }

    render() {

        return (            
            <nav>
                <Row>
                    <Col>
                        <Jumbotron fluid>
                            <Container>
                                <InputGroup className="mb-12">
                                    <FormControl
                                        placeholder="Pokemon's name"
                                        aria-label="Pokemon's name"
                                        aria-describedby="basic-addon2"
                                        value={this.state.value} 
                                        onChange={this.handleChange} 
                                    />
                                    <InputGroup.Append>
                                        <Button onClick={this.fetchPokemon} variant="info">Catch!</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </nav>
        )
    }
}