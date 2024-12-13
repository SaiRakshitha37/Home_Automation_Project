import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangeEmail() {


    const images = [
        "/assets/images/backgroundImage1.jpg", 
        "/assets/images/backgroundImage2.jpg", 
        "/assets/images/backgroundImage3.jpg"
      ];
    
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5 seconds for the slideshow
    
        return () => clearInterval(interval); // Clean up interval on component unmount
      }, [images.length]);








    const [formData, setFormData] = useState({
        currentEmail: '',
        newEmail: '',
        confirmNewEmail: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    

    const handleEmailChange = async (e) => {
        e.preventDefault();
        if (formData.newEmail !== formData.confirmNewEmail) {
            setMessage('Emails do not match');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/auth/change-email/${localStorage.getItem('userId')}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage('Email changed successfully');
                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                setMessage(data.message);
            }
        } catch (err) {
            setMessage('Email change failed');
        }
    };
    
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f7f8fc',
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s ease-in-out',
        },
        card: {
            backgroundColor: '#fff',
            padding: '30px 40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light transparency for the background to merge with image
            padding: '40px 50px',
            borderRadius: '12px', // Slightly rounded corners for a modern feel
            width: '400px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)', // Adding blur effect behind the card for a nice soft look
            border: 'none',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: 'white',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        input: {
            marginBottom: '15px',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            outline: 'none',
        },
        button: {
            padding: '12px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            padding: '12px',
            backgroundColor: 'black', // Subtle green color for the button
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            width: '100%',
        },
        error: {
            color: 'red',
            marginTop: '10px',
            textAlign: 'center',
    
        },
    
    };
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Change Email</h2>
                <form onSubmit={handleEmailChange} style={styles.form}>
                    <input
                        style={styles.input}
                        type="email"
                        name="currentEmail"
                        placeholder="Current Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="email"
                        name="newEmail"
                        placeholder="New Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="email"
                        name="confirmNewEmail"
                        placeholder="Confirm New Email"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" style={styles.button}>Change Email</button>
                    {message && <div style={styles.error}>{message}</div>}
                </form>
            </div>
        </div>
    );
}


export default ChangeEmail;