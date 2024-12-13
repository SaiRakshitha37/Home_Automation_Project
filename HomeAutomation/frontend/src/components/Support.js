import React from 'react';
import GeneralNavbar from './GeneralNavbar';

function Support() {
    return (
        <>
            <GeneralNavbar/>
            <div style={styles.page}>
                <div style={styles.container}>
                    <h1 style={styles.title}>
                        <i className="fas fa-life-ring" style={styles.icon}></i> Support
                    </h1>
                    <p style={styles.subtitle}>Need help? Explore our resources below:</p>

                    <div style={{ ...styles.section, ...styles.sectionHover }}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fas fa-book-open" style={styles.icon}></i> Quick Start Guide
                        </h2>
                        <p style={styles.text}>
                            Learn how to set up your ESP32 board and connect your appliances:
                            <a href="/guides/quick-start.pdf" style={styles.link} download> Download Quick Start Guide</a>
                        </p>
                    </div>

                    <div style={{ ...styles.section, ...styles.sectionHover }}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fas fa-tools" style={styles.icon}></i> Troubleshooting
                        </h2>
                        <p style={styles.text}>If your system isn't working as expected, follow these steps:</p>
                        <ul style={styles.list}>
                            <li>Ensure the ESP32 board is powered on and connected to Wi-Fi.</li>
                            <li>Check the appliance's wiring.</li>
                            <li>Refresh the webpage or restart your device.</li>
                        </ul>
                    </div>

                    <div style={{ ...styles.section, ...styles.sectionHover }}>
                        <h2 style={styles.sectionTitle}>
                            <i className="fas fa-headphones-alt" style={styles.icon}></i> Contact Support
                        </h2>
                        <p style={styles.text}>
                            If you're still having trouble, reach us directly at:
                            <strong> <a href="mailto:support@homeappliance.com" style={styles.link}>support@homeappliance.com</a></strong>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("/path-to-background-image.jpg")', // High-quality background similar to the image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0,
        color: '#fff', // White text on dark background
    },
    container: {
        padding: '30px',
        maxWidth: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark background to let the background image show through
        borderRadius: '0', // Full-screen background, no border radius
        boxShadow: 'none', // Remove any shadow
        fontFamily: "'Roboto', sans-serif",
        textAlign: 'center',
        height: '100vh', // Ensure the container takes up the full height
    },
    title: {
        fontSize: '42px',
        color: '#fff',
        fontWeight: '700',
        letterSpacing: '1.5px',
    },
    subtitle: {
        fontSize: '18px',
        color: '#ddd',
        marginBottom: '30px',
    },
    section: {
        marginBottom: '30px',
        padding: '25px',
        backgroundColor: '#222',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        textAlign: 'left',
        transition: 'transform 0.3s ease-in-out',
    },
    sectionHover: {
        ':hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        },
    },
    sectionTitle: {
        fontSize: '26px',
        color: '#fff',
        fontWeight: '600',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottom: '2px solid #4CAF50',
        paddingBottom: '8px',
    },
    text: {
        fontSize: '16px',
        color: '#ccc',
        lineHeight: '1.6',
    },
    list: {
        listStyleType: 'none',
        paddingLeft: '20px',
        marginTop: '15px',
        fontSize: '16px',
        color: '#ccc',
    },
    link: {
        color: '#4CAF50',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'color 0.3s ease-in-out',
    },
    icon: {
        marginRight: '10px',
        fontSize: '30px',
        color: '#4CAF50',
    },
};

export default Support;