import React from "react";
import './styles.css'

const Header = ({ numbersOfItems = 0, onHandlerCart, user}) => {
    console.log('user', user)
    return (
        <div className="header-menu">
            <div className="header-menu-logo">
                <h2 className="header-logo">DS🐢</h2>
            </div>
            <div className="header-menu-cart">
                <div className="header-menu-avatar-container">
                    <img className="header-menu-avatar" src={user.avatar} alt={user.name} />
                </div>
                <div onClick={onHandlerCart}>
                <img className="header-menu-cart-image"  src="https://cdn-icons-png.flaticon.com/512/834/834781.png" alt="cart"/>
                <div className="header-menu-cart-number-container">
                    <span className="header-menu-cart-number">{numbersOfItems}</span>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Header;