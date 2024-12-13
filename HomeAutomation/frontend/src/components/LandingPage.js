import React from 'react';
import { Link } from 'react-router-dom';
import GeneralNavbar from './GeneralNavbar';



function LandingPage() {
    return (
        <>
            <GeneralNavbar/>

            <div style={styles.container}>

                {/* Hero Section */}
                <div style={styles.hero}>
                    <div style={styles.heroContent}>
                        <h1 style={styles.heroHeading}>
                            Welcome to <span style={styles.highlight}>SmartHome</span>
                        </h1>
                        <div style={styles.buttons}>
                            <Link to="/signup">
                                <button style={styles.button}>Get Started</button>
                            </Link>
                            <Link to="/login">
                                <button style={{ ...styles.button, backgroundColor: 'grey' }}>Log In</button>
                            </Link>
                        </div>
                    </div>
                    <div style={styles.heroImage}>
                        <img
                            src="https://www.gvssmart.com/uploads/2023/08/301046222947.jpg" // Replace with your smart home image
                            alt="Smart Home Automation"
                            style={styles.image}
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div style={styles.featuresSection}>
                    <h2 style={styles.sectionHeading}>Why Choose Us?</h2>
                    <div style={styles.features}>
                        <div style={styles.feature}>
                            <img
                                src="/assets/images/icon1.png"
                                alt="Feature 1"
                                style={styles.featureIcon}
                            />
                            <h3 style={styles.featureHeading}>Smart Control</h3>
                            <p style={styles.featureText}>Control your appliances with ease using our advanced IoT technology.</p>
                        </div>
                        <div style={styles.feature}>
                            <img
                                src="/assets/images/icon2.png"
                                alt="Feature 2"
                                style={styles.featureIcon}
                            />
                            <h3 style={styles.featureHeading}>Energy Efficiency</h3>
                            <p style={styles.featureText}>Save energy and reduce bills with automated systems.</p>
                        </div>
                        <div style={styles.feature}>
                            <img
                                src="/assets/images/icon3.png"
                                alt="Feature 3"
                                style={styles.featureIcon}
                            />
                            <h3 style={styles.featureHeading}>Accessibility</h3>
                            <p style={styles.featureText}>Great for people with disabilities or those who have difficulty moving around, as voice commands can replace physical switches and buttons.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <p>&copy; 2024 SmartHome Automation. All Rights Reserved.</p>
                </div>
            </div>
        </>
        
        
    );
}

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#F7F8FA',
        color: '#333',
        minHeight: '100vh',
    },
    
    hero: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 20px',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://www.gvssmart.com/uploads/2023/08/301046222947.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        minHeight: '80vh',
    },
    heroContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroHeading: {
        fontSize: '3em',
        marginBottom: '20px',
    },
    highlight: {
        color: 'white',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'column', // Stack buttons vertically
        gap: '20px', // Add space between the buttons
        marginTop: '20px',
    },
    button: {
        padding: '12px 30px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        backgroundColor: 'grey',
        color: 'white',
        width: '200px', // Make buttons the same width
        textAlign: 'center',
    },
    heroImage: {
        display: 'none', // Hide the image for simplicity; you can adjust this
    },
    featuresSection: {
        textAlign: 'center',
        padding: '60px 20px',
        backgroundColor: '#FFF',
    },
    sectionHeading: {
        fontSize: '2.5em',
        marginBottom: '40px',
        color: '#333',
    },
    features: {
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
    },
    feature: {
        maxWidth: '300px',
        textAlign: 'center',
    },
    featureIcon: {
        width: '80px',
        marginBottom: '20px',
    },
    featureHeading: {
        fontSize: '1.5em',
        marginBottom: '10px',
        color: '#333',
    },
    featureText: {
        color: '#666',
    },
    footer: {
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
    },
};

export default LandingPage;