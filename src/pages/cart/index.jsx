import React from "react";
import { Link } from "react-router-dom";
import './styles.css'

const Cart = () => {
    return (
        <div className="cart-container">
            <h1>Cart</h1>
            <div className="button-container">
            <Link to="/" className="button-cart">Home</Link>
            </div>
        </div>
    )
}

export default Cart;