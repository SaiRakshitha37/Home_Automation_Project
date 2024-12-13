import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaLock, FaPhone, FaEnvelope, FaKey } from 'react-icons/fa';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        email: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setError('');
                toast.success('User registered successfully!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Sign up failed');
        }
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <div style={styles.wrapper}>
                <div style={styles.imageContainer}>
                    <img src="https://www.intuoer.com/static/index/picture/2.jpg" alt="Sign Up" style={styles.image} />
                </div>
                <div style={styles.formContainer}>
                    <h2 style={styles.heading}>Sign Up</h2>
                    <form onSubmit={handleSignUp} style={styles.form}>
                        <div style={styles.inputContainer}>
                            <FaUser style={styles.icon} />
                            <input style={styles.input} type="text" name="username" placeholder="Username" onChange={handleChange} required />
                        </div>
                        <div style={styles.inputContainer}>
                            <FaLock style={styles.icon} />
                            <input style={styles.input} type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        </div>
                        <div style={styles.inputContainer}>
                            <FaKey style={styles.icon} />
                            <input style={styles.input} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
                        </div>
                        <div style={styles.inputContainer}>
                            <FaPhone style={styles.icon} />
                            <input style={styles.input} type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                        </div>
                        <div style={styles.inputContainer}>
                            <FaEnvelope style={styles.icon} />
                            <input style={styles.input} type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        </div>
                        <button type="submit" style={styles.button}>Sign Up</button>
                        {error && <p style={styles.error}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh',
    },
    formContainer: {
        flex: 1,
        padding: '40px',
        backgroundColor: '#dcdcdc', // Complementary warm grey color
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeft: '2px solid #aaa',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
        backgroundColor: '#f7f7f7',
    },
    icon: {
        fontSize: '20px',
        color: '#666',
        marginRight: '10px',
    },
    input: {
        flex: 1,
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        padding: '8px 0',
        backgroundColor: 'transparent',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s',
    },
    error: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
    },
};

export default SignUp;