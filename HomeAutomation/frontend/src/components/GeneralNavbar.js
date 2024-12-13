import React from 'react';
import { Link } from 'react-router-dom';

function GeneralNavbar(){
    return (
        <div style={styles.navbar}>
            <div style={styles.logo}>
                <h1 style={styles.logoText}>HomeMatic</h1>
            </div>
            <div style={styles.navLinks}>
                <Link to="/LandingPage" style={styles.navLink}>Home</Link>
                <Link to="/Support" style={styles.navLink}>Support</Link>
                <Link to="/About" style={styles.navLink}>About Us</Link>
                <Link to="/help" style={styles.navLink}>Help?</Link>
                <Link to="/products" style={styles.navLink}>Products</Link>
            </div>
        </div>
    );
}


const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        padding: '0 30px',
        backgroundColor: '#000',
        color: '#fff',
    },
    logo: {
        fontSize: '1.5em',
    },
    logoText: {
        color: 'white',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        gap: '15px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1em',
        transition: 'color 0.3s',
    },
}

export default GeneralNavbar;