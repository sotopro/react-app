import React, { useState, useContext} from "react";
import './styles.css'
import { Link, useLocation, useParams } from "react-router-dom";
import { Card } from "../../components";
import { CartContext } from "../../context";

const Detail = () => {
    const { id } = useParams() || {};
    const { state } = useLocation() || {};
    const { onDecreaseItem, onIncreaseItem, getItemQuantity} = useContext(CartContext);

    

    return (
        <div className="detail-container">
            {state ? (
            <Card 
                product={state} 
                key={state?.name} 
                onSelect={() => {}} type='mCard' 
                descreaseQty={onDecreaseItem} 
                increaseQty={onIncreaseItem} 
                numberOfItem={getItemQuantity(state?.id)}
                />
            ) : <Link to="/" className="button-cart">Go Home</Link>}
        </div>
    )
}

export default Detail;