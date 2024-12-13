import React, { useState, useRef, useEffect } from 'react';
import { Link, useAsyncError } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({ appliances,userId,onSearch }) {
    const [username, setUsername] = useState("Guest");
    const [email, setEmail] = useState("-");
    const [showDropdown, setShowDropdown] = useState(false);
    const [logoutHover, setLogoutHover] = useState(false);
    const [passwordButtonHover, setPasswordButtonHover] = useState(false);
    const [emailButtonHover, setEmailButtonHover] = useState(false);

    const navigate = useNavigate();

    const toggleDropdown = () => setShowDropdown(!showDropdown);


    const profileRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            profileRef.current && !profileRef.current.contains(event.target) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };


    const handleAbout = () => {
        navigate('/');
    }


  
    useEffect(() => {
      if (showDropdown) {
        document.addEventListener('click', handleClickOutside);
      } else {
        document.removeEventListener('click', handleClickOutside);
      }
    }, [showDropdown]);

    useEffect(()=>{
        const fetchUserData = async () => {
            try{
                const response = await fetch(`http://localhost:5000/api/auth/user/${userId}`);
                const data = await response.json();
                if(response.ok){
                    setUsername(data['userData'][0]['username']);
                    setEmail(data['userData'][0]['email']);
                } else{
                    console.error("Failed to fetch username:", data.message);
                }
            }catch(error){
                console.log("Error fetching username:",error);
            }
        };
        fetchUserData();
    },[userId]);


        
    const styles = {
        navbar: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
            // backgroundColor: '#4CAF50',
            color: 'black',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'black',
        },
        title: {
            margin: 0,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '3rem',
        },
        profileContainer: {
            fontFamily: 'Roboto, sans-serif',
            position: 'relative',
        },
        profileIcon: {
            fontSize: '24px',
            cursor: 'pointer',
        },
        dropdown: {
            position: 'absolute',
            right: 0,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '50px',
            width: '300px',
            padding: '10px',
            zIndex: '1001',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backdropFilter: 'blur(13px)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
        dropdownItem: {
            margin: '10px 0',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '4px',
            transition: 'background-color 0.3s',
        },
        dropdownItemHover: {
            backgroundColor: '#f0f0f0',
        },
        link: {
            textDecoration: 'none',
            color: 'black',
            cursor: 'pointer', // pointer cursor only on the clickable area (link)
            margin: '10px 10px 10px 10px',
        },
        nonClickableItem: {
            cursor: 'default',
        },
        logoutButton: {
            padding: '8px 16px',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            textAlign: 'center',
            display: 'inline-block',
            margin: '0',
        },
        hr: {
            width: '90%',  
            border: '0',    
            borderTop: '1px solid white',  
            margin: '10px 0',  
        },
        profile: {
            width: '50px',   
            height:'50px',  
            borderRadius: '50%',
        },
        searchContainer: {
            // flex: 1,
            // display: 'flex',
            // justifyContent: 'center',
        },
        searchWrapper: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
        },
        searchInput: {
            padding: '5px 30px 5px 10px',
            borderRadius: '50px',
            width: '220px',
            height: '30px',
            border: '1px solid #ccc',
        },
        searchIcon: {
            position: 'absolute',
            right: '10px',
            fontSize: '16px',
            color: '#888',
            pointerEvents: 'none',
        },
        aboutButton: {
            fontSize: '24px',
            cursor: 'pointer',
            transition: 'transfrom 0.2s',
        },
        aboutButtonHover: {
            transfrom: 'scale(1.1)',
        },
        navLinks: {
            display: 'flex',
            gap: '15px',
            // fontFamily: 'Roboto, sans-serif',
        },
        navLink: {
            color: 'white',
            textDecoration: 'none',
            fontSize: '1em',
            transition: 'color 0.3s',
        },
        loginButton:{
            backgroundColor: logoutHover ? 'rgba(100, 100, 100, 0.7)' : 'rgba(700, 700, 700, 0.5)',
        },
        emailButton: {
            backgroundColor: emailButtonHover ? 'rgba(100, 100, 100, 0.7)' : 'rgba(700, 700, 700, 0.5)',
        },
        passwordButton: {
            backgroundColor: passwordButtonHover ? 'rgba(100, 100, 100, 0.7)' : 'rgba(700, 700, 700, 0.5)',
        }
    };





    return (
        <div style={styles.navbar} >


            <h1 style={styles.title}>HomeMatic</h1>


            <div style={styles.searchContainer}>
                <div style={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search appliances..."
                        style={styles.searchInput}
                        onChange={(e) => onSearch(e.target.value)} // Call search handler passed from Dashboard
                        />
                    <span style={styles.searchIcon}>🔍</span>
                </div>
            </div>
            
            <div onClick={handleAbout} style={styles.aboutButton}>
            </div>


            <div style={styles.navLinks}>
                <Link to="/LandingPage" style={styles.navLink}>Home</Link>
                <Link to="/Support" style={styles.navLink}>Support</Link>
                <Link to="/About" style={styles.navLink}>About Us</Link>
                <Link to="/help" style={styles.navLink}>Help?</Link>
                <Link to="/products" style={styles.navLink}>Products</Link>
            </div>





            <div style={styles.profileContainer} ref={profileRef}>
                <div onClick={toggleDropdown} style={styles.profileIcon}>
                    <img src="/assets/images/finalProfilepng.png" alt="Logo" style={styles.profile} />
                </div>
                {showDropdown && (
                    <div style={styles.dropdown} ref={dropdownRef}>
                        <p style={{...styles.dropdownItem, ...styles.nonClickableItem}}>Username: {username}</p>
                        <p style={{...styles.dropdownItem, ...styles.nonClickableItem}}>Email: {email}</p>
                        <p style={{...styles.dropdownItem, ...styles.nonClickableItem}}>No. of Appliances: {Object.keys(appliances).length}</p>
                        <hr style={styles.hr}></hr>
                        <Link to = "/ChangePassword" style={styles.link}><p 
                                                                            style={{...styles.logoutButton, ...styles.passwordButton}} 
                                                                            onMouseEnter={() => setPasswordButtonHover(true)} 
                                                                            onMouseLeave={() => setPasswordButtonHover(false)}
                                                                        >Change Password
                                                                        </p>
                        </Link>
                        <Link to = "/ChangeEmail" style={styles.link}><p 
                                                                            style={{...styles.logoutButton, ...styles.emailButton} }
                                                                            onMouseEnter={() => setEmailButtonHover(true)} 
                                                                            onMouseLeave={() => setEmailButtonHover(false)}
                                                                        >
                                                                            Change Email
                                                                        </p>
                        </Link>
                        <hr style={styles.hr}></hr>
                        <Link to = "/Login" style={styles.link}><p 
                                                                    style={{...styles.logoutButton, ...styles.loginButton}}
                                                                    onMouseEnter={() => setLogoutHover(true)} 
                                                                    onMouseLeave={() => setLogoutHover(false)} 
                                                                >
                                                                    Logout
                                                                </p>
                        </Link>
                    </div>
                )}
            </div>


        </div>
    );
}

export default Navbar;
