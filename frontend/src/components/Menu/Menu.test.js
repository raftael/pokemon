import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';

it('renders Menu component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menu />, div);
});