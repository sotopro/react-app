import React from "react";
import './styles.css'

const Progress = ({ scroll }) => {
    return (
        <div className="progress" style={{
            background: `linear-gradient(to right, #4B4BAA ${scroll}%, #fff ${scroll}%)`
        }}/>
    )
}
export default Progress;