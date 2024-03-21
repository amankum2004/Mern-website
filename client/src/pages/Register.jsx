import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";


// const URL = "http://localhost:27017/api/auth/register"

export const Register = () => {
    const [user,setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });

    const navigate = useNavigate();
    const {storeTokenInLS,API} = useAuth();

    // handling the input values
    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
    }

    // handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        // alert(user)
        try{
            // const response = await fetch(URL,{
            const response = await fetch(`${API}/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(user)
            })
            // console.log(response)
            const res_data = await response.json();
            console.log("response from server",res_data.extraDetails);

            if (response.ok) {
                // STORE THE TOKEN IN LOCALHOST
                storeTokenInLS(res_data.token);
                // localStorage.setItem("token",res_data.token);
                setUser({username:"",email:"",phone:"",password:""})
                toast.success("Registration successful")
                // navigate("/login")
                navigate("/")
            }else{
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
            }
        }catch (error) {
            console.log("register",error)
        }
    }

    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" alt="contact img" 
                            width="500"
                            height="500"/>
                        </div>

                        {/* Now takcle the registration form */}
                        <div className="registration-form">
                            <h1 className="main-heading">Registration form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input type="text"
                                    name="username"
                                    placeholder="username"
                                    id="username"
                                    required
                                    autoComplete="off"
                                    value={user.username}
                                    onChange={handleInput} />
                                </div>
                                
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
                                    <label htmlFor="phone">phone</label>
                                    <input type="number"
                                    name="phone"
                                    placeholder="Enter your number"
                                    id="phone"
                                    required
                                    autoComplete="off"
                                    value={user.phone}
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
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}