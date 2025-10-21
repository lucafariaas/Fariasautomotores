import React from 'react';

const ItemListContainer = ({ mensaje }) => {
    return (
    <div className="item-list-container">
    <h1 className="welcome-message">{mensaje}</h1>
    <p>Próximamente aquí estarán todos nuestros automotores disponibles</p>
    </div>
    );
}

export default ItemListContainer;