import React, { useContext} from "react";
import './styles.css';
import { Link } from "react-router-dom";
import { CartContext } from "../../context";
import CartItem from "../cart-item";

const Sidebar = ({children, onClose, isOpen}) => {
    const { cart } = useContext(CartContext);
    return (
        <div 
        className="sidebar"
        style={{
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
        }}
        >
            <div className="close-button-container">
                <button onClick={onClose} className="close-button">X</button>
            </div>
            <div  className='cart-container'>
                {cart.length === 0 ? (
                <p className='empty-cart'>Your cart is empty</p>
                ) : (
                    cart.map((item) => (
                        <CartItem key={item.id} {...item} />
                    )
                ))}
            <Link to='/cart' className='button-cart'>Go to Cart</Link>
            </div>
        </div>
    )
}

export default Sidebar;