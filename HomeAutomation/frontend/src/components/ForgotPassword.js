import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Send the email to the backend to initiate the forgot password process
      // const response = await axios.post('/api/auth/forgot-password', { email });
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      
      setMessage(response.data.message); // Success message
    } catch (error) {
      setMessage(error.response.data.message); // Error message
      console.log(error);
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
        <h2 style={styles.heading}>Forgot Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>

            {/* <label htmlFor="email" style={styles.label}>Email</label> */}
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <div style={styles.error}>{message}</div>}
      </div>
    </div>
  );
}




export default ForgotPassword;

