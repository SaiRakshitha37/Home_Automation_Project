import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import ApplianceModal from './ApplianceModal';
import AddApplianceModal from './AddApplianceModal';
import NewApplianceCard from './NewApplicanceCard';

function NewDashboard() {
    const [appliances, setAppliances] = useState([]);
    const [selectedAppliance, setSelectedAppliance] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filteredAppliances, setFilteredAppliances] = useState([]);
    const [history, setHistory] = useState([]);
    const [time, setTime] = useState(new Date());
    const userId = localStorage.getItem('userId');
    const [isHovered, setIsHovered] = useState(false);



    useEffect(() => {
        const fetchAppliances = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/appliance/user/${userId}`);
                const data = await response.json();
                if (response.ok) {
                    setAppliances(data.appliances || []);
                    setFilteredAppliances(data.appliances || []);
                } else {
                    console.error("Failed to fetch appliances:", data.message);
                }
            } catch (error) {
                console.error("Error fetching appliances:", error);
            }
        };
        fetchAppliances();
    }, [userId]);

    useEffect(() => {

        const timer = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timer);

    }, []);



    const handleSearch = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = appliances.filter(appliance =>
            appliance.name.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredAppliances(filtered);
    };

    const handleToggle = async (applianceId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appliance/${applianceId}/toggle`, { method: 'PUT' });
            if (response.ok) {
                const updatedAppliance = await response.json();
                setAppliances(appliances.map(appliance =>
                    appliance._id === applianceId ? { ...appliance, status: updatedAppliance.appliance.status } : appliance
                ));
                setFilteredAppliances(filteredAppliances.map(appliance =>
                    appliance._id === applianceId ? { ...appliance, status: updatedAppliance.appliance.status } : appliance
                ));
                const action = updatedAppliance.appliance.status ? 'turned ON' : 'turned OFF';
                addHistory(`${updatedAppliance.appliance.name} was ${action} at ${new Date().toLocaleString()}`);

            } else {
                console.error("Failed to toggle appliance status");
            }
        } catch (error) {
            console.error("Error toggling appliance status:", error);
        }
    };

    const handleDelete = async (applianceId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/appliance/${applianceId}`, { method: 'DELETE' });
            if (response.ok) {
                const deletedAppliance = appliances.find(appliance => appliance._id === applianceId);
                setAppliances(appliances.filter(appliance => appliance._id !== applianceId));
                setFilteredAppliances(filteredAppliances.filter(appliance => appliance._id !== applianceId));
                addHistory(`${deletedAppliance.name} was deleted at ${new Date().toLocaleString()}`);
            } else {
                console.error("Failed to delete appliance");
            }
        } catch (error) {
            console.error("Error deleting appliance:", error);
        }
    };

    const handleAddAppliance = (newAppliance) => {
        fetch('http://localhost:5000/api/appliance/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newAppliance, userId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.appliance) {
                    setAppliances([...appliances, data.appliance]);
                    setFilteredAppliances([...filteredAppliances, data.appliance]);
                    addHistory(`${data.appliance.name} was added at ${new Date().toLocaleString()}`);
                }
            })
            .catch(error => console.error('Error adding appliance:', error));
    };

    const addHistory = (message) => {
        setHistory(prev => [message, ...prev].slice(0, 15));
    };

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);
    const closeApplianceModal = () => setSelectedAppliance(null);


    const totalAppliances = appliances.length;
    const appliancesOn = appliances.filter(a => a.status).length;


    const styles = {
        container: {
            display: 'flex', 
            flexDirection: 'column',
            height: '100vh', 
            overflow: 'hidden',
            // backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://www.thepinnaclelist.com/wp-content/uploads/2019/12/000a-Luxury-Home-Design-3-Strategies-to-Create-Chic-Modern-Interiors.jpg")',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/assets/images/dashboardCropped.png")',

            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        header: { 
            textAlign: 'center', 
            justifyContent: 'space-between', 
            padding: '10px', 
            backgroundColor: 'transparent', 
            borderBottom: '1px solid transparent' 
        },
        statistics: { 
            cursor: 'default', 
            display: 'flex', 
            justifyContent: 'space-around', 
            padding: '10px', 
            backdropFilter: 'blur(0px)', 
            backgroundColor: 'rgba(300, 300, 300, 0)' 
        },
        statCard: { 
            backdropFilter: 'blur(5px)', 
            padding: '10px', 
            paddingRight: '30px', 
            paddingLeft: '30px', 
            backgroundColor: '#fff', 
            borderRadius: '50px', 
            width: 'auto', 
            fontFamily: 'Roboto, sans-serif', 
        },
        content: { 
            flex: 1, 
            overflowY: 'auto', 
            paddingTop: '20px', 
            margin: '10px' 
        },
        cardGrid: { 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '50px', 
            margin: '10px' 
        },
        addCard: {
            padding: '15px', 
            textAlign: 'center', 
            cursor: 'pointer', 
            margin: '10px',
            borderRadius: '8px', 
            display: 'flex',
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
            color: isHovered ? 'black' : 'white',
            border: isHovered ? '2px dashed rgba(50,50,50)' : '2px dashed #ddd',
            transition: 'transform 0.3s ease-in-out',
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '150px', 
            width: '150px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            backdropFilter: 'blur(10px)',
        },
        history: { 
            fontFamily: 'Roboto, sans-serif', 
            height: '120px', 
            overflowY: 'auto', 
            padding: '10px', 
            borderRadius: '8px', 
            backgroundColor: 'rgba(30, 30, 30, 0.9)', 
            color: 'white', },
        addCardHovered: {
            transform: 'scale(1.05)',
        }
       
    }


    return (
        <div style={styles.container}>
            <Navbar appliances={appliances} userId={userId} onSearch={handleSearch} />
            <div style={styles.header}>
                <h3>{time.toLocaleTimeString()}</h3>
            </div>

            <div style={styles.statistics}>
                <div style={styles.statCard}>Total Appliances: {totalAppliances}</div>
                <div style={styles.statCard}>Appliances ON: {appliancesOn}</div>
                <div style={styles.statCard}>Appliances OFF: {totalAppliances - appliancesOn}</div>
            </div>
            <div style={styles.content}>
                <div style={styles.cardGrid}>
                    {filteredAppliances.map(appliance => (
                        <NewApplianceCard
                            key={appliance._id}
                            appliance={appliance}
                            onToggle={handleToggle}
                            onClick={() => setSelectedAppliance(appliance)}
                            onDelete={handleDelete}
                        />
                    ))}
                    <div 
                        style={{...styles.addCard, ...(isHovered && styles.addCardHovered)}}
                        onClick={openAddModal}
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <h1>+</h1>
                        <p>Add Appliance</p>
                    </div>
                </div>
            </div>
            {selectedAppliance && (
                <ApplianceModal appliance={selectedAppliance} onClose={closeApplianceModal} />
            )}
            {isAddModalOpen && (
                <AddApplianceModal onClose={closeAddModal} onAdd={handleAddAppliance} />
            )}
            <div style={styles.history}>
                <h4>History</h4>
                {history.length > 0 ? (
                    <ul>{history.map((entry, index) => <li key={index}>{entry}</li>)}</ul>
                ) : (
                    <p>No recent activity</p>
                )}
            </div>
        </div>
    );
}


export default NewDashboard;