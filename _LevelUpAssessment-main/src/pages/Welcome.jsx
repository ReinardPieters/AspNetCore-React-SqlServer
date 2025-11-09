import React from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Navbar from "../components/navbar";

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div style={{backgroundImage: 'url(/assets/backgrounds/space-background.webp)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', position: 'relative'}}>
            <div className="logo">
                <img src="/assets/logos/softserve-logo.webp" alt="softserve" srcset="" />
            </div>
            <div className="bottom">
                <div className="left">
                    <img src="/assets/logos/time-to-level-up.webp" alt="levelUpTime" srcset="" />
                    <button className="viewGrads" onClick={() => navigate('/viewAll')}> View Graduates <img src="/assets/icons/rocket_white.webp" alt="rocket" /></button>
                </div>
                <div className="coverContainer">
                    <img src="/assets/illustrations/cover.webp" alt="cover" className="cover"></img>
                </div>
            </div>
            <div className="bars">
                <div style={{backgroundColor: '#31ADE3', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                <div style={{backgroundColor: '#71C389', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                <div style={{backgroundColor: '#F1A51F', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                <div style={{backgroundColor: '#ED2224', height: '15px', width: '100%'}}></div>
            </div>
        </div>
    )
}

export default Welcome;