import React from "react";
import Navbar from "../components/navbar";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../App.css';
import './ViewGraduate.css';

function ViewGraduate(){
    const { id } = useParams();
    const [grad, setGrad] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:5122/api/Graduate/getbyid/${id}`)
            .then(res => res.json())
            .then(data => setGrad(data))
            .catch(err => console.log(err));
    }, [id]);
    
    const calculateAge = (dateOfBirth) => {
        const [day, month, year] = dateOfBirth.split('-');
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    
    if (!grad) return <div>Loading...</div>;
    return (
        <div>
            <Navbar />
            <div className="viewContainer">
                <div className="Name"><span className="font-bold">{grad.firstName}</span> {grad.lastName}</div>
                <div className="containerInfo">
                    <div className='Email'>
                        <p className="yellow">Email</p>
                        <p>{grad.email}</p>
                    </div>
                    <div className="Phone">
                        <p className="yellow" >Phone Number</p>
                        <p>{grad.phoneNumber}</p>
                    </div>
                    <div className='Age'>
                        <p className="yellow">Age</p>
                        <p>{calculateAge(grad.dateOfBirth)}</p>
                    </div>
                </div>
                <div className="containerDates">
                    <div className="created">
                        <p className="yellow">Date Created</p>
                        <p>{grad.dateCreated}</p>
                    </div>
                    <div>
                        <p className="yellow">Last edited</p>
                        <p>{grad.dateModified || "Never"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewGraduate;
