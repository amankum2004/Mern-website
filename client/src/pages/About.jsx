// import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth"



export const About = () => {
    const {user} = useAuth();
    return (
        <>
        <main>
            <section className="section-hero">
                <div className="container">
                    <div className="hero-content">
                        <p>Welcome, 
                            {user ? `${user.username} to our website` : `to our website`}
                        </p>
                        <h3>Why choose us</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit quia voluptatem excepturi dolorum at eum itaque debitis temporibus. Velit consequuntur sed placeat corrupti aut odio molestiae itaque, quidem officia similique explicabo iste, voluptas quaerat expedita, accusantium repellat veniam. Rem quis aut nulla exercitationem expedita.</p>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}