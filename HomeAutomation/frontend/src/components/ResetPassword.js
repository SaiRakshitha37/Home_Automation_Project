// src/components/ResetPassword.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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






    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password, confirmPassword });
            setMessage(response.data.message);
            setTimeout(() => navigate('/Dashboard'), 2000);
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f7f8fc',
            fontFamily: 'Arial, sans-serif',
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 1s ease-in-out', 
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '30px 40px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '400px',
            width: '100%',
            backdropFilter: 'blur(10px)', // Adding blur effect behind the card for a nice soft look
            border: 'none',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#333',
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
            transition: 'border-color 0.2s',
        },
        button: {
            padding: '12px',
            fontSize: '16px',
            backgroundColor: 'black',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.3s',
            width: '100%',
        },
        error: {
            color: 'red',
            marginTop: '10px',
            textAlign: 'center',
        },
        label: {
            padding: '10px 10px 10px 2px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Reset Password</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* <label style={styles.label}>New Password</label> */}
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* <label style={styles.label}>Confirm Password</label> */}
                    <input
                        style={styles.input}
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p style={styles.error}>{message}</p>}
            </div>
        </div>
    );
}





export default ResetPassword;
