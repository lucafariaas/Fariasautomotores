import React from 'react';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import './App.css';

function App() {
    return (
    <div className="App">
    <NavBar />
    <ItemListContainer mensaje="¡Bienvenido a G. Farias AUTOMOTORES!" />
    </div>
    );
}

export default App;