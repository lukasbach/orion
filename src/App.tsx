import React from 'react';
import logo from './logo.svg';
import './App.css';
import { CustomTile } from './CustomTile';

function App() {
  return (
    <div className="App">
      <CustomTile children="쇠" color={'#2fa497'} border={true} clickable={true} />
      <CustomTile children="귀" color={'#e53232'} active={true} clickable={true} border={true} />
      <CustomTile children="려" color={'#c4b24f'} border={true} clickable={true} />
      <CustomTile children="려" color={'#c4b24f'} border={true} clickable={true} />
      <CustomTile children="" color={'#c9d4de'} border={true} />
      <CustomTile children="" color={'#c9d4de'} border={true} active={true} />
      <CustomTile children="" color={'#c9d4de'} noContent={true} border={true} />
      <CustomTile children="" color={'#c9d4de'} noContent={true} border={true} clickable={true} />
    </div>
  );
}

export default App;
