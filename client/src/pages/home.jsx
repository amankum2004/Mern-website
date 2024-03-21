export const Home = () => {
    return(
        <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <h1>SBT</h1>
                        <p>Hello everyone</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio quibusdam perspiciatis odit dolor sunt, quas quia nemo officia beatae id! Aperiam nemo commodi architecto provident nobis tempora id cupiditate, voluptatibus necessitatibus aliquam at, earum minima beatae minus? Totam quibusdam exercitationem illum pariatur fugiat quod?</p>
                        <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn">Connect Us</button>
                            </a>
                            
                            <a href="/services">
                                <button className="btn">Learn more</button>
                            </a>
                        </div>
                    </div>

                    {/* hero images */}
                    <div className="hero-image">
                        <img src="/images/home.jpeg" alt="let's code together"
                        width="500"
                        height="500" />
                    </div>

                </div>
            </section>
        </main>
        </>
    )

}