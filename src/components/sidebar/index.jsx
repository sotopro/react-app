import React from "react";
import './styles.css';

const Sidebar = ({children, onClose}) => {
    return (
        <div className="sidebar">
            <div className="close-button-container">
                <button onClick={onClose} className="close-button">X</button>
            </div>
            {children}
        </div>
    )
}

export default Sidebar;