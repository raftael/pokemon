import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardGroup';
import './items.css';
import { camelize } from '../../utils/utils';


export default class Items extends React.Component {
  
  render() {
      const { items } = this.props;
        return (
        <CardDeck>
          {items.map(item => (
            <Card bg="light" className="item-card text-center" key={item.id}>
                <Card.Img variant="top" src={item.sprites.front_default} />
                <Card.Body>
                    <Card.Title>{item.id}-{camelize(item.name)}</Card.Title>
                </Card.Body>
            </Card>
        ))}
        </CardDeck>
      );
    }

}