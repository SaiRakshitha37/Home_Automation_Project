import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Login({setUser}) {
      const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // const response = await fetch('http://localhost:5000/api/auth/login', {
              const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setError('');
                toast.success('Login successful!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setUser(data.user); 
                localStorage.setItem('userId', data.user._id);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Login failed');
        }
    };
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

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundImage: `url(${images[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transition: 'background-image 1s ease-in-out', // Smooth transition effect
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light transparency for the background to merge with image
      padding: '40px 50px',
      borderRadius: '12px', // Slightly rounded corners for a modern feel
      width: '400px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)', // Adding blur effect behind the card for a nice soft look
      border: 'none', // Remove border for a smoother look
    },
    heading: {
      fontSize: '24px',
      color: '#fff', // White text to stand out on darker images
      marginBottom: '20px',
    },
    input: {
      marginBottom: '15px',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      outline: 'none',
      transition: 'border-color 0.2s',
      width: '93%'
    },
    button: {
      padding: '12px',
      backgroundColor: 'black', // Subtle green color for the button
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      width: '100%', // Ensures the button spans across the entire width of the form
    },

    error: {
      marginTop: '10px',
      textAlign: 'center',
      display: 'block',
    },
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
          <button style={styles.button} type='submit'>Login</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <Link to="/signUp" style={styles.error}>Don't have an account? Sign Up here</Link>
        <Link to="/forgot-password" style={styles.error}>Forgot your password?</Link>
      </div>
    </div>
  );
}

export default Login;