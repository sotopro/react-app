import React, { useState, useContext, useEffect} from "react";
import './styles.css'
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components";
import { CartContext } from "../../context";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseServices } from "../../services";

const { getProductById } = firebaseServices;
const Detail = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams() || {};

    const { onDecreaseItem, onIncreaseItem, getItemQuantity, products, setProducts} = useContext(CartContext);

    useEffect(() => {
        getProductById(id)
            .then((product) => {
                setProduct(product[0]);
            })
    }, [id])

    console.log('products', product)
    useEffect(() => {
        if(products.length === 0) {
            const db = getFirestore();
            const q = query(
                collection(db, 'products'), 
                );
            getDocs(q)
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        setProducts((prev) => [...prev, doc.data()])
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [products.length, setProducts])

    return (
        <div className="detail-container">
            {product ? (
            <Card 
                product={product} 
                key={product?.name} 
                onSelect={() => {}} type='mCard' 
                descreaseQty={onDecreaseItem} 
                increaseQty={onIncreaseItem} 
                numberOfItem={getItemQuantity(product?.id)}
                />
            ) : <Link to="/" className="button-cart">Go Home</Link>}
        </div>
    )
}

export default Detail;