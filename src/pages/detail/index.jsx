import React from "react";
import './styles.css'
import { Link, useLocation, useParams } from "react-router-dom";
import { Card } from "../../components";

const Detail = () => {
    const { id } = useParams() || {};
    const { state } = useLocation() || {};

    console.log('id', id, state, state);
    return (
        <div className="container">
            {state ? (<Card product={state} key={state?.name} onSelect={() => {}}/>) : <Link to="/" className="button-cart">Go Home</Link>}
        </div>
    )
}

export default Detail;