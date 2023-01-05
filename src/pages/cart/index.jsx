import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context";
import { CartItem } from "../../components";
import './styles.css'
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Cart = () => {
    const { cart, total } = useContext(CartContext);
    const onHandlerOrder = () => {
        const newOrder = {
            buyer: {
                name: 'Juan',
                email: 'juan@gmail.com',
                phone: '123456789',
                shippingMethod: 'delivery',
                address: 'Calle falsa 123',
            },
            createdAt: new Date(),
            id: 1,
            items: cart,
            payment: {
                currency: 'USD',
                method: 'cash',
                type: 'cash',
            },
            seller: {
                id: 1,
                name: 'Pepito',
                phone: '123456789',
                email: 'adwda@gmail.com'
            },
            shipping: {
                deliveryDate: new Date() + 7,
                trackingNumber: '123456789',
                type: 'delivery',
            },
            total: total,
        }
        const db = getFirestore();
        const ordersCollection = collection(db, 'orders');

        addDoc(ordersCollection, newOrder)
            .then((docRef) => {
                console.log(docRef)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="cart">
            <h1>Cart</h1>
            <div className="cart-content">
                {cart.length > 0 ? (
                    <>
                    {cart.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="button-container-order">
                        <button type="button" className="button-cart" onClick={onHandlerOrder}>
                            Order now
                        </button>
                    </div>
                    </> 
                ) : (
                <div>
                    <h2>Cart is empty</h2>
                    <div className="button-container">
                        <Link to="/" className="button-cart">Home</Link>
                    </div>
                </div>
            )}
            </div>
            
        </div>
    )
}

export default Cart;