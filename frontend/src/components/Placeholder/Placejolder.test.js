import React from 'react';
import ReactDOM from 'react-dom';
import Placeholder from './Placeholder';

it('renders Placeholder component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Placeholder />, div);
});