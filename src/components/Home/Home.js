import React from 'react'
import './Home.css';
import Navbar from '../Navbar/Navbar'

function Home() {
    return (
        <div className = "homepage-wrapper">
            <Navbar></Navbar>
            <div className = "content">
               <span> Lyrical Library </span>
               <span> Enhancing the experience of 
                  <br /> music worldwide. </span>
            </div>
        </div>
    )
}

export default Home
