import React from "react";
import './styles.css';

const Button = ({text, onHandlerClick}) => {
    return (
        <button onClick={onHandlerClick} className="button-primary">{text}</button>
    )
}


export default Button;