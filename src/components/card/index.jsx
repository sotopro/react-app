import React from "react";
import './styles.css';

const Card = ({ product, onSelect, type = 'vCard', descreaseQty, increaseQty, numberOfItem }) => {
    const { id, categoryId, description, image, name, price, stock } = product || {};
    return (
        <div className={type === 'vCard' ? 'card' : 'cardMax'} onClick={() => onSelect(product)}>
            <img className="card-image" src={image} alt={name} />
            <div className="card-content">
                <h3 className="card-name">{name}</h3>
                <p className="card-description">{description}</p>
                <p className="card-price">${price}</p>
                <p className="card-stock"><b>{stock}</b> in stock</p>
            </div>
            {type === 'mCard' && (
                <div className="card-button-container">
                <button 
                    disabled={numberOfItem === 0} 
                    onClick={() => descreaseQty(id)} 
                    className='card-button-minus'
                >-</button>
                <input
                    disabled
                    className='card-input'
                    type='text'
                    value={numberOfItem}
                    
                />
                <button
                 onClick={() => increaseQty(id)} 
                 className='card-button-plus'
                 disabled={numberOfItem === stock}
                 >+</button>
            </div>
            )}
            
        </div>
    )
}

export default Card;