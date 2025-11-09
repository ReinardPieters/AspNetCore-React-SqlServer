import "./DeleteModal.css";

function DeleteModal({ graduate, onDelete, onCancel }) {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <p>DELETE GRADUATE</p>
                <h1 className="font-bold">DELETE</h1>
                <div className="deleteUserName">
                    <p className="font-bold">{graduate.firstName}</p>
                    <p> {graduate.lastName}</p>
                </div>
                
                <div className="modalButtons">
                    <button className="deleteBtn" onClick={onDelete}>Delete</button>
                    <button className="cancelBtn" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
