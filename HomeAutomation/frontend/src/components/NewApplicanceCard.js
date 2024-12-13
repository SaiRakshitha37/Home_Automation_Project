import React, { useState } from 'react';

function NewApplianceCard({ appliance, onToggle, onClick, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);
    const [cardHovered, setCardHovered] = useState(false);
    const fetchFromUrl = async (applianceType, action) => {
        const applianceUrls = {
            bulb: {
                turnOn: 'http://172.168.0.40/toggle?state=on',   
                turnOff: 'http://172.168.0.40/toggle?state=off',  
                // turnOn:'http://localhost:8080/bulb/turnOn',
                // turnOff:'http://localhost:8080/bulb/turnOff'
            },
            fan: {
                turnOn: 'http://172.168.0.40/toggle?state=on',   
                turnOff: 'http://172.168.0.40/toggle?state=off',

                // turnOn:'http://localhost:8080/fan/turnOn',
                // turnOff:'http://localhost:8080/fan/turnOff'
            },
        };

        const url = applianceUrls[applianceType] ? applianceUrls[applianceType][action] : null;
        if (!url) {
            console.error("No URL found for this action.");
            return;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                console.log(`${action} action successful for ${applianceType}:`, data);
                alert(JSON.stringify(data));
            } else {
                console.error("Failed to fetch from URL:", data.message);
            }
        } catch (error) {
            console.error("Error fetching from URL:", error);
        }
    };

    const handleToggle = async (e) => {
        e.stopPropagation(); // Prevent triggering the onClick event
        const action = appliance.status ? 'turnOff' : 'turnOn';
        const applianceType = appliance.type.toLowerCase(); // Ensure the type is lowercase
        // Fetch the corresponding URL for the action
        await fetchFromUrl(applianceType, action);
        onToggle(appliance._id);
    };


    

const styles = {
    card: {
        // backgroundColor: '#f9f9f9',
        // border: '1px solid #ddd',
        fontFamily: 'Roboto, sans-serif',
        border: '1px solid black',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        width: '150px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '10px',
        position: 'relative',
        backdropFilter: 'blur(13px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        transition: 'transform 0.3s ease-in-out',
        // color: 'white',
    },
    cardHovered: {
        transform: 'scale(1.05)',  // Slightly enlarge the card on hover
    },
    deleteButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#888',
    },
    toggleButton: {
        padding: '8px 12px',
        // backgroundColor: '#4CAF50',
        backgroundColor: isHovered ? 'rgba(100, 100, 100, 0.7)' : 'rgba(700, 700, 700, 0.5)',
        color: 'black',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400',
        fontSize: '16px',
        // color: '#fff',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    
};


    return (
        <div 
            style={{...styles.card, ...(cardHovered && styles.cardHovered)}} 
            onClick={onClick}
            onMouseEnter={() => setCardHovered(true)} 
            onMouseLeave={() => setCardHovered(false)}
            >
            <button style={styles.deleteButton} onClick={(e) => {
                e.stopPropagation();
                onDelete(appliance._id);
            }}>×</button>
            <h3>{appliance.name}</h3>
            <p>Status: {appliance.status ? 'On' : 'Off'}</p>
            <button 
                style={styles.toggleButton}
                onClick={handleToggle}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
            >
                {appliance.status ? 'Turn Off' : 'Turn On'}                
            </button>
        </div>
    );
}

export default NewApplianceCard;


// const styles = {
//     card: {
//         // backgroundColor: '#f9f9f9',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         padding: '20px',
//         textAlign: 'center',
//         width: '150px',
//         cursor: 'pointer',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         margin: '10px',
//         position: 'relative',
//         backdropFilter: 'blur(13px)',
//         backgroundColor: 'rgba(255, 255, 255, 0.5)'
//         // color: 'white',
//     },
//     deleteButton: {
//         position: 'absolute',
//         top: '10px',
//         right: '10px',
//         background: 'transparent',
//         border: 'none',
//         fontSize: '18px',
//         cursor: 'pointer',
//         color: '#888',
//     },
//     toggleButton: {
//         padding: '8px 12px',
//         // backgroundColor: '#4CAF50',
//         // backgroundColor: 'rgba(700, 700, 700, 0.5)',
//         backgroundColor: isHovered ? 'rgba(50, 50, 50, 0.7)' : 'rgba(100, 100, 100, 0.5)',
//         color: 'black',
//         fontFamily: 'Roboto, sans-serif',
//         fontWeight: '400',
//         fontSize: '16px',
//         // color: '#fff',
//         border: 'none',
//         borderRadius: '50px',
//         cursor: 'pointer',
//         transition: 'background-color 0.3s ease',
//     },
//     toggleButton: {
//         padding: '8px 12px',
//         // backgroundColor: '#4CAF50',
//         backgroundColor: 'rgba(700, 700, 700, 0.5)',
//         color: 'black',
//         fontFamily: 'Roboto, sans-serif',
//         fontWeight: '400',
//         fontSize: '16px',
//         // color: '#fff',
//         border: 'none',
//         borderRadius: '50px',
//         cursor: 'pointer',
//     },
// };


// import React, { useState } from 'react';

// function NewApplianceCard({ appliance, onToggle, onClick, onDelete }) {
//     const [isHovered, setIsHovered] = useState(false);

//     const fetchFromUrl = async (applianceType, action) => {
//         const applianceUrls = {
//             bulb: {
//                 turnOn: 'http://localhost:8080/bulb/turnOn',
//                 turnOff: 'http://localhost:8080/bulb/turnOff',
//             },
//             fan: {
//                 turnOn: 'http://localhost:8080/fan/turnOn',
//                 turnOff: 'http://localhost:8080/fan/turnOff',
//             },
//         };

//         const url = applianceUrls[applianceType] ? applianceUrls[applianceType][action] : null;
//         if (!url) {
//             console.error('No URL found for this action.');
//             return;
//         }

//         try {
//             const response = await fetch(url);
//             const data = await response.json();
//             if (response.ok) {
//                 console.log(`${action} action successful for ${applianceType}:`, data);
//                 alert(JSON.stringify(data));
//             } else {
//                 console.error('Failed to fetch from URL:', data.message);
//             }
//         } catch (error) {
//             console.error('Error fetching from URL:', error);
//         }
//     };

//     const handleToggle = async (e) => {
//         e.stopPropagation(); // Prevent triggering the onClick event
//         const action = appliance.status ? 'turnOff' : 'turnOn';
//         const applianceType = appliance.type.toLowerCase(); // Ensure the type is lowercase
//         // Fetch the corresponding URL for the action
//         await fetchFromUrl(applianceType, action);
//         onToggle(appliance._id);
//     };

//     // Inline style for toggle button with hover effect
//     const styles = {
//         card: {
//             border: '1px solid #ddd',
//             borderRadius: '8px',
//             padding: '20px',
//             textAlign: 'center',
//             width: '150px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//             margin: '10px',
//             position: 'relative',
//             backdropFilter: 'blur(13px)',
//             backgroundColor: 'rgba(255, 255, 255, 0.5)',
//         },
//         deleteButton: {
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             background: 'transparent',
//             border: 'none',
//             fontSize: '18px',
//             cursor: 'pointer',
//             color: '#888',
//         },
//         toggleButton: {
//             padding: '8px 12px',
//             backgroundColor: isHovered ? 'rgba(50, 50, 50, 0.7)' : 'rgba(100, 100, 100, 0.5)',  // Darker color when hovered
//             color: 'black',
//             fontFamily: 'Roboto, sans-serif',
//             fontWeight: '400',
//             fontSize: '16px',
//             border: 'none',
//             borderRadius: '50px',
//             cursor: 'pointer',
//             transition: 'background-color 0.3s ease', // Smooth transition
//         },
//     };

//     return (
//         <div style={styles.card} onClick={onClick}>
//             <button
//                 style={styles.deleteButton}
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     onDelete(appliance._id);
//                 }}
//             >
//                 ×
//             </button>
//             <h3>{appliance.name}</h3>
//             <p>Status: {appliance.status ? 'On' : 'Off'}</p>
//             <button
//                 style={styles.toggleButton}
//                 onClick={handleToggle}
//                 onMouseEnter={() => setIsHovered(true)}  // Change hover state on mouse enter
//                 onMouseLeave={() => setIsHovered(false)} // Revert hover state on mouse leave
//             >
//                 {appliance.status ? 'Turn Off' : 'Turn On'}
//             </button>
//         </div>
//     );
// }

// export default NewApplianceCard;
