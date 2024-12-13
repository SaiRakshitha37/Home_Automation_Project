import React from 'react';
import { Link } from 'react-router-dom';
import GeneralNavbar from './GeneralNavbar';


function About() {
  return (
    <>
    
    <GeneralNavbar/>
    <div style={styles.container}>

      <div style={styles.section}>
        <div style={styles.imageContainer}>
          <img
            src="/assets/images/aboutus2.jpg" // Replace with your preferred image URL
            alt="Home Automation"
            style={styles.image}
          />
        </div>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Smart Home Automation</h1>
          <p style={styles.paragraph}>
            Experience the future of living with seamless control over your
            home. From smart lights to intelligent appliances, automate every
            corner of your space to match your lifestyle.
          </p>
        </div>
      </div>

      {/* Section 2: Text on Left, Image on Right */}
      <div style={{ ...styles.section, flexDirection: "row-reverse" }}>
        <div style={styles.imageContainer}>
          <img
            src="/assets/images/aboutus1.jpg" // Replace with your preferred image URL
            alt="Voice-Controlled Automation"
            style={styles.image}
          />
        </div>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Voice-Controlled Automation</h1>
          <p style={styles.paragraph}>
            With cutting-edge voice technology, controlling your home is now as
            simple as speaking. Say goodbye to switches and hello to effortless
            living.
          </p>
        </div>
      </div>

      {/* Section 3: Image on Left, Text on Right */}
      <div style={styles.section}>
        <div style={styles.imageContainer}>
          <img
            src="/assets/images/aboutus3.jpg" // Replace with your preferred image URL
            alt="Energy Efficiency"
            style={styles.image}
          />
        </div>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Easy Accessibility</h1>
          <p style={styles.paragraph}>
            Allows elderly users to control appliances, lights, and devices with a lot of ease by eliminating the need for physical interaction.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

const styles = {

  actions: {
    display: 'flex',
    gap: '10px',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    width: '100%',
    padding: '40px 20px',
    boxSizing: 'border-box',
    backgroundColor: '#f5f5f5',
    fontFamily: "'Poppins', sans-serif",
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '500px',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    flex: 1,
    padding: '20px',
    textAlign: 'left',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '15px',
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#555',
  },
};

export default About;