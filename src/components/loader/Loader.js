import React from 'react'
import './Loader.css'

function Loader() {
    return (
        <div className = "loader-wrapper">
            <h1>Loading</h1>
            <div className = "circle circle1"></div>
            <div className = "circle circle2"></div>
            <div className = "circle circle3"></div>
        </div>
    )
}

export default Loader
