import { createContext, useState } from 'react';
import { PRODUCTS } from '../constants/data/products';

const initialState = {
    products: [],
    cart: [],
    setCart: () => {},
    getItemQuantity: () => {},
    onDecreaseItem: () => {},
    onIncreaseItem: () => {},
    total: 0
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    
    const onDecreaseItem = (id) => {
        setCart(currentCart => {
            if(currentCart?.find((product) => product.id === id)?.quantity === 1){
                return currentCart.filter((product) => product.id !== id);
            } else {
                return currentCart?.map((product) => {
                    if(product.id === id) {
                        return {
                            ...product,
                            quantity: product.quantity - 1
                        }
                    } else {
                        return product;
                    }
                })
            }
        })
    }
    const onIncreaseItem = (id) => {
        const item = products.find((product) => product.id === id);
        if(cart?.find((product) => product.id === id)?.quantity === item.stock) return;
        if(cart?.length === 0) {
            setCart([{...item, quantity: 1}])
        } else if(cart?.length > 0 && !cart?.find((product) => product.id === id)){
            setCart([...cart, {...item, quantity: 1}]);
        } else {
            setCart(currentCart => {
                return currentCart.map((product) => {
                    if(product.id === id) {
                        return { ...product, quantity: product.quantity + 1 }
                    } else {
                        return product;
                    }
                })
            })
        }
    }

    const getItemQuantity = (id) => {
        return cart?.find((product) => product.id === id)?.quantity || 0;
    }

    const total = cart?.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);

    const onRemoveItem = (id) => {
        setCart(currentCart => {
            return currentCart.filter((product) => product.id !== id);
        })
    }

    return (
        <CartContext.Provider value={{ cart, setCart, onDecreaseItem, onIncreaseItem, getItemQuantity, onRemoveItem, total, products, setProducts }}>
            {children}
        </CartContext.Provider>
    )
}