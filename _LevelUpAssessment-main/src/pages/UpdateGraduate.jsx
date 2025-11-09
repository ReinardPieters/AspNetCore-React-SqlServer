import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/create.css";

const UpdateGraduate = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        DateOfBirth: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5122/api/Graduate/getbyid/${id}`)
            .then(res => res.json())
            .then(data => {
                setFormData({
                    FirstName: data.firstName,
                    LastName: data.lastName,
                    Email: data.email,
                    PhoneNumber: data.phoneNumber,
                    DateOfBirth: data.dateOfBirth
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const formDataObj = new FormData(e.target);
        const data = {
            GraduateId: parseInt(id),
            FirstName: formDataObj.get("FirstName"),
            LastName: formDataObj.get("LastName"),
            Email: formDataObj.get("Email"),
            DateOfBirth: formDataObj.get("DateOfBirth"),
            PhoneNumber: formDataObj.get("PhoneNumber"),
        };
        fetch(`http://localhost:5122/api/graduate/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Update failed");
                return res.json();
            })
            .then((data) => {
                alert(data.message || "Graduate updated successfully");
            })
            .catch((err) => {
                alert(err.message || "An error occurred");
            });
    };

    return (
        <>
            <Navbar />
            <div className="headingContainer">
                <div className="heading">
                    <p>Level Up 2024</p>
                    <h1>UPDATE GRADUATE</h1>
                </div>
                <div className="picture">
                    <div style={{backgroundColor: '#31ADE3', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                    <div style={{backgroundColor: '#71C389', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                    <div style={{backgroundColor: '#F1A51F', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                    <div style={{backgroundColor: '#ED2224', height: '15px', width: '100%'}}></div>
                </div>
            </div>
            <form className="formCreate" onSubmit={handleUpdate}>
                <div className="inputRow">
                    <div className="inputContainer">
                        <label htmlFor="FirstName">Name</label>
                        <input type="text" name="FirstName" placeholder="First Name" value={formData.FirstName} onChange={(e) => setFormData({...formData, FirstName: e.target.value})} required />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="LastName">Surname</label>
                        <input type="text" name="LastName" placeholder="Last Name" value={formData.LastName} onChange={(e) => setFormData({...formData, LastName: e.target.value})} required />
                    </div>
                </div>
                <div className="inputRow">
                    <div className="inputContainer">
                        <label htmlFor="PhoneNumber">Phone Number</label>
                        <input type="tel" name="PhoneNumber" placeholder="+27 73 680 4454" pattern="\+27 \d{2} \d{3} \d{4}" title="Format: +27 XX XXX XXXX" value={formData.PhoneNumber} onChange={(e) => setFormData({...formData, PhoneNumber: e.target.value})} required />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="Email">Email Address</label>
                        <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={(e) => setFormData({...formData, Email: e.target.value})} required />
                    </div>
                </div>
                <div className="inputRow">
                    <div className="inputContainer">
                        <label htmlFor="DateOfBirth">Date Of Birth</label>
                        <input type="text" name="DateOfBirth" placeholder="dd-mm-yyyy" pattern="\d{2}-\d{2}-\d{4}" title="Format: dd-mm-yyyy" value={formData.DateOfBirth} onChange={(e) => setFormData({...formData, DateOfBirth: e.target.value})} required />
                    </div>
                    <div className="buttonContainer">
                        <button type="submit" className="submit">
                            Update Graduate
                            <img src="/assets/icons/rocket_white.webp" alt="rocket" style={{height: '20px'}} />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default UpdateGraduate;