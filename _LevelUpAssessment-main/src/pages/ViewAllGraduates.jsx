import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import '../App.css';
const ViewAllGraduates = () => {
    const [graduates, setGraduates] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedGraduate, setSelectedGraduate] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5122/api/Graduate/getall')
            .then(res => res.json())
            .then(data => setGraduates(data.filter(grad => !grad.isDeleted)))
            .catch(err => console.log(err));
    }, []);
    const handleDeleteClick = (graduate) => {
        setSelectedGraduate(graduate);
        setShowModal(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:5122/api/Graduate/delete/${selectedGraduate.graduateId}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                setGraduates(graduates.filter(g => g.graduateId !== selectedGraduate.graduateId));
                setShowModal(false);
                setSelectedGraduate(null);
            })
            .catch(err => console.log(err));
    };

    const cancelDelete = () => {
        setShowModal(false);
        setSelectedGraduate(null);
    };
    return (
        <>
        <div style={{position: 'relative', minHeight: '100vh'}}>
            <Navbar />
            <img src="/assets/illustrations/dude.webp" alt="dude" className="dudeImage" style={{position: 'fixed', right: 0, bottom: 0, height: '600px', zIndex: 1, transform: 'scaleX(-1)'}} />
            <section id="graduatesSection" className="md:px-12 px-4 mt-6" style={{width: 'calc(70% + 50px)', position: 'relative', zIndex: 2}}>
                <table className="w-full border border-white md:rounded-t-xl rounded-t-lg overflow-hidden" style={{borderCollapse: 'collapse'}}>
                    <thead className="bg-white uppercase micro-5 text-3xl">
                        <tr>
                            <th className="md:rounded-s-xl rounded-s-lg md:py-2 py-1 md:px-8 px-4">
                                <div className="relative flex justify-center items-center">
                                    Full Name
                                    <img src="../assets/icons/rocket_black.webp" className="absolute right-0 h-2/3 md:block hidden" />
                                </div>
                            </th>
                            <th className="md:py-2 py-1 md:px-8 px-4 md:table-cell hidden">
                                <div className="relative flex justify-center items-center">
                                    Contact Details
                                    <img src="../assets/icons/rocket_black.webp" className="absolute right-0 h-2/3" />
                                </div>
                            </th>
                            <th className="md:rounded-e-xl rounded-e-lg md:py-2 py-1 md:px-8 px-4">
                                <div className="flex justify-center items-center">
                                    Actions
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {graduates.length === 0 ? (
                            <tr >
                                <td colSpan="3" className="text-center">No graduates found</td>
                            </tr>
                        ) : (
                            graduates.map(user => (
                                <tr key={user.graduateId}>
                                    <td style={{padding: 0, verticalAlign: 'top'}}>
                                        <div className= "fullname"style={{padding: '8px', borderLeft: '1px solid #E3F0D3', borderBottom: '1px solid #E3F0D3', minHeight: '60px', boxSizing: 'border-box', justifyContent: 'center'}}>
                                            <span className="font-bold">{user.firstName} </span>, {user.lastName}
                                        </div>
                                    </td>
                                    <td className="md:table-cell hidden" style={{padding: 0, verticalAlign: 'top'}}>
                                        <div className="contact" style={{padding: '8px', borderBottom: '1px solid #E3F0D3', minHeight:'60px', boxSizing: 'border-box', justifyContent: 'center'}}>
                                            <p>
                                                {user.email || user.phoneNumber || <span style={{color: '#ED2224'}}>Field empty</span>}
                                            </p>
                                        </div>
                                    </td>
                                    <td style={{padding: 0, verticalAlign: 'top'}}>
                                        <div className='buttonRow' style={{padding: '8px', borderRight: '1px solid #E3F0D3', borderBottom: '1px solid #E3F0D3', minHeight: '60px', boxSizing: 'border-box'}}>
                                            <Link to={`/graduate/${user.graduateId}`}><button className='view'>View Mode</button></Link>
                                            <Link to={`/update/${user.graduateId}`}><button className="edit">Update</button></Link>
                                            <button className="delete" onClick={()=>handleDeleteClick(user)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
        {showModal && selectedGraduate && (
            <DeleteModal 
                graduate={selectedGraduate} 
                onDelete={confirmDelete} 
                onCancel={cancelDelete} 
            />
        )}
        </>
    )
}

export default ViewAllGraduates;