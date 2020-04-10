import React from 'react';
import { render } from 'react-dom';
import OnePage from '../../src';

const App = () => (
  <OnePage>
    <div style={{ height: '100vh', backgroundColor: 'green' }}></div>
    <div style={{ height: '100vh', backgroundColor: 'red' }}></div>
    <div style={{ height: '100vh', backgroundColor: 'blue' }}></div>
    <div style={{ height: '100vh', backgroundColor: 'yellow' }}></div>
  </OnePage>
);

render(<App />, document.getElementById('root'));
