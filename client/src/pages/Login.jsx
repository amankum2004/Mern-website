import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth"
import {toast} from "react-toastify";

// const URL = "http://localhost:27017/api/auth/login"

export const Login = () => {
    const [user,setUser] = useState({
        email:"",
        password:"",
    });

    const navigate = useNavigate();
    // const {storeTokenInLS} = useAuth();
    const {storeTokenInLS,API} = useAuth();

    // handling the input values
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
    }

    // handling the form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(user)
        try {
            const response = await fetch(`${API}/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user)
            });
            console.log("from login form",response)
            console.log(response)
            const res_data = await response.json();

            if (response.ok) {
                console.log("response from server",res_data);
                // STORE THE TOKEN IN LOCALHOST
                storeTokenInLS(res_data.token);
                // localStorage.setItem("token",res_data.token);
                setUser({email:"",password:""})
                toast.success("Login successful")
                navigate("/")
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message ? res_data.message : "Invalid credentials")
                console.log("Invalid credentials")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.jpeg" alt="contact img" 
                            width="400"
                            height="200"/>
                        </div>

                        {/* Now takcle the login form */}
                        <div className="registration-form">
                            <h1 className="main-heading">Login form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput} />
                                </div>
                                
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input type="text"
                                    name="password"
                                    placeholder="password"
                                    id="password"
                                    required
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput} />
                                </div>

                                <br />
                                <button type="submit" className="btn btn-submit">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}