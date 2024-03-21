import { useAuth } from "../store/auth"

export const Service = () => {
    const {services} = useAuth();

    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="container grid grid-three-cols">

                {services.map((currEle,index) => {
                    const {service,description,provider} = currEle;

                    return(
                        <div className="card" key={index}>
                            <div className="card-img">
                                <img src="/images/services1.jpeg"
                                alt="service info"
                                width="400" />
                            </div>

                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{provider}</p>
                                </div>
                                <h2>{service}</h2>
                                <p>{description}</p>
                            </div>
                        </div> 
                    );
                })}
                
            </div>
        </section>
    )
}