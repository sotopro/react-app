import React, { useState, useContext, useEffect} from "react";
import './styles.css'
import { Link, useParams } from "react-router-dom";
import { Card } from "../../components";
import { CartContext } from "../../context";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const Detail = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams() || {};

    const { onDecreaseItem, onIncreaseItem, getItemQuantity, products, setProducts} = useContext(CartContext);

    useEffect(() => {
        const db = getFirestore();
        const q = query(
            collection(db, 'products'), 
            where('id', '==', id),
            );
        getDocs(q)
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    setProduct(doc.data())
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

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