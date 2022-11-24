import React from "react";
import './styles.css';

const Button = ({text, onHandlerClick}) => {
    return (
        <button onClick={onHandlerClick} className="button-primary">{text}</button>
    )
}

// class Button extends React.Component {
//     render() {
//         return (
//             <button className="button-primary">{this.props.text}</button>
//         )
//     }
// }

export default Button;