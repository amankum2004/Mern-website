import { useState } from "react"
import { useAuth } from "../store/auth";

const defaultContactFormData = {
    username:"",
    email:"",
    message:"",
};
    
export const Contact = () => {
    const [contact,setContact] = useState(defaultContactFormData);

    const [userData,setUserData] = useState(true); 
    const {user,API} = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });

        setUserData(false);
    }

    // handling the input values
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]:value,
        })
        // 
        // setContact((prev) => ({
        //     ...prev,
        //     [name]:value,
        // }))
    }

    // handling the form submission
    const handleSubmit = async (e) =>{
        e.preventDefault();
        // console.log(contact)
        try {
            // const response = await fetch("http://localhost:27017/api/form/contact",{
            const response = await fetch(`${API}/api/form/contact`,{
                method: "POST",
                headers: {
                    'Content-Type':"application/json",
                },
                body: JSON.stringify(contact)
            });

            if(response.ok){
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                alert("message sent successfully");
            }
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Contact US</h1>
            </div>

            {/* Contact page main */}
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/contact.jpeg" alt="contact us" />
                </div>

                {/* Contact form */}
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" 
                            name="username" 
                            id="username" 
                            autoComplete="off"
                            value={contact.username}
                            onChange={handleInput}
                            required/>
                        </div>
                        
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email" 
                            name="email" 
                            id="email" 
                            autoComplete="off"
                            value={contact.email}
                            onChange={handleInput}
                            required/>
                        </div>

                        <div>
                            <label htmlFor="message">message</label>
                            <textarea name="message" 
                            id="message"
                            autoComplete="off"
                            value={contact.message}
                            onChange={handleInput}
                            required 
                            cols="30" 
                            rows="10"></textarea>
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </section>

            </div>
        </section>
        </>
    )
}