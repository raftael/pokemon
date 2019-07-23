import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './items.css';
import { camelize } from '../../utils/utils';


export default function Items(props) {
  const { items } = props;
  return (
    <CardGroup>
      {items.map(item => (
        
        <Card bg="light" text="dark" className="item-card text-center" border="light" key={item.id}>         
          <Card.Img variant="top" src={item.sprites.front_default} />
          <Card.Body>
            <Card.Title>{item.id}-{camelize(item.name)}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );

}
