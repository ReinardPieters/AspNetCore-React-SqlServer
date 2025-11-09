import "./create.css"
function Create(){
    const handleRegister = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const data =  {
            FirstName: formData.get("FirstName"),
            LastName: formData.get("LastName"),
            Email: formData.get("Email"),
            DateOfBirth: formData.get("DateOfBirth"),  
            PhoneNumber: formData.get("PhoneNumber"),
        }
        fetch("http://localhost:5122/api/graduate/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.status === "Success"){
                alert("Graduate created successfully");
                e.target.reset();
            }
            else{
                alert(data.message);
            }
        }
        )
        .catch((err) => alert(err))
    }
    return(
        <>
        <div className="headingContainer">
            <div className="heading">
                <p>Level Up 2024</p>
                <h1>CREATE GRADUATE</h1>
            </div>
            <div className="picture">
                <div style={{backgroundColor: '#31ADE3', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                <div style={{backgroundColor: '#71C389', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                <div style={{backgroundColor: '#F1A51F', height: '15px', width: '100%', marginBottom: '5px'}}></div>
                <div style={{backgroundColor: '#ED2224', height: '15px', width: '100%'}}></div>
            </div>
        </div>
        <form className="formCreate" onSubmit={handleRegister}>
            <div className="inputRow">
                <div className="inputContainer">
                    <label htmlFor="FirstName">Name</label>
                    <input type="text" name="FirstName" placeholder="First Name" required />
                </div>
                <div className="inputContainer">
                    <label htmlFor="LastName">Surname</label>
                    <input type="text" name="LastName" placeholder="Last Name" required />
                </div>
            </div>
            <div className="inputRow">
                <div className="inputContainer">
                    <label htmlFor="PhoneNumber">Phone Number</label>
                    <input type="tel" name="PhoneNumber" placeholder="+27 73 680 4454" pattern="\+27 \d{2} \d{3} \d{4}" title="Format: +27 XX XXX XXXX" required />
                </div>
                <div className="inputContainer">
                    <label htmlFor="Email">Email Address</label>
                    <input type="email" name="Email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter a valid email address" required />
                </div>
            </div>
            <div className="inputRow">
                <div className="inputContainer">
                    <label htmlFor="DateOfBirth">Date Of Birth</label>
                    <input type="text" name="DateOfBirth" placeholder="dd-mm-yyyy" pattern="\d{2}-\d{2}-\d{4}" title="Format: dd-mm-yyyy" required />
                </div>
                <button type="submit" className="submit">
                    Add New Graduate
                    <img src="/assets/icons/rocket_white.webp" alt="rocket" style={{height: '20px'}} />
                </button>
            </div>
        </form>
        </>
    )
}
export default Create;