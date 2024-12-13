import React, { useState } from 'react';
import GeneralNavbar from './GeneralNavbar';


const Help = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [inquiry, setInquiry] = useState(''); // To track user's inquiry
    const [submitted, setSubmitted] = useState(false); // To track if the inquiry has been submitted

    const questions = [
        { question: "What is Home Automation?", answer: "“Home automation is simply connecting all the functional elements of your home to a network (Internet) and putting it to work for you.”\n\nHome automation technology lets you control, monitor and track your home from anywhere in the world, using your smartphone, computer or tablet device. Besides providing active real-time control, the devices can also be programmed to respond to external events, without requiring your input.\n\nFor instance, controlling your lights from your smartphone is active control, while programming your lights to automatically turn on, when an intruder breaks in, is passive control.\n\n\nWhen paired up with sources for contextual information (weather, traffic, social media, sensors, usage-patterns, etc.), home automation technology can be used to achieve both forms of control (active and passive), and deliver an unparalleled comfort experience." },

        { question: "What all things can I automate in my home?", 
            answer: "The easiest way to enumerate the possibilities is to just look around your home and count all the stuff that’s connected to a grid (electric or network), and pair it up with all the things that can be measured (temperature, humidity, etc.), tracked (door movements, motion, activity, etc.) or controlled (electronic devices). You add them up, and you have the answer to all the possibilities offered by Internet of Things (IoT)." },

        { question: "Why should I automate my home?", answer: "We spend so much time and capital to make our homes beautiful, but we spend little to nothing to make them functional. \nFor instance, every car has sensors that automatically detect intrusion and trigger an alarm; every smartphone has ambient sensors that automatically adjust the brightness based on external lighting; why don’t we have the same for our homes? Why do we still protect our precious homes using just one small piece of metal? Why do we still have inefficient mechanical switches that don’t sense our presence, and have to be turned on/off manually? \nHome automation technology is what makes your home intelligently functional, like your car or smartphone. \nIt allows you to control connected appliances, read environmental data, sense intruder movements, change ambience, manage mechanical devices, and do a lot more. It provides you the flexibility to control everything in your home from your smartphone, tablet, computer or using just your voice. \nIn the end, if we spend so much on making the home look good, why can’t we invest a fraction of it in making the home feel good?" },

        { question: "Do you manufacture these smart devices?", answer: "No, we integrate devices from trusted manufacturers into a seamless system." },

        { question: "Would the system work when there's no Internet?", answer: "We understand that this can be a huge concern, especially if you’re buying a security kit. And that’s the reason we endorse security kits that can trigger a local alarm, even without an active Internet connection (Zigbee/RF/Z-Wave operated).\n\nAs an add-on, we also provide an auto-failover router that automatically switches to a wireless alternative, when your primary Internet connection gets inactive." },

        { question: "What do you guys actually do?", answer: "We provide a platform to control and monitor your smart devices with ease, using voice commands or a dashboard." },

        { question: "Is the system compatible with my existing appliances?", answer: "Many existing appliances can be automated using smart plugs or adapters." },

        { question: "How do I know which system is the best for me?", 
            answer: "Choosing the best system is now simpler than ever. We have handpicked the best products in every package, so that you enjoy the best possible home automation experience. Just pick the best plan, based on the pre-defined concepts and use-cases, and leave the rest onto us.\n\nNeon: If you want to reduce your energy bills and control lights intelligently.\n\nShield: If you want to protect your home, track movements, and get notifications.\n\nAtom: If you want the benefits of both economy and security package, with the added advantage of talking directly to a virtual assistant. It’s our recommended package, as it has the highest automation touchpoints.\n\nUno: If you wish to have a sophisticated automation experience and control everything from a single, easy-to-use interface.\n\nIf you wish to buy products from a specific brand or want a customized automation setup, checkout our shop. In case the product you want is unavailable, write to us at: customersupport@smartify.in, or simply drop your query, here." 
        },

        { question: "Is my data secure on this platform?", answer: "We use encryption to ensure your data is secure and protected against unauthorized access." },

        { question: "How much does it cost to automate my home?", answer: "Costs vary based on the number of devices and features. Contact us for a custom quote." },

        { question: "Can I customize automation schedules?", answer: "Yes, you can create custom schedules for your devices to suit your needs." }
    ];

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleInquiryChange = (event) => {
        setInquiry(event.target.value);
    };

    const handleSubmitInquiry = (event) => {
        event.preventDefault();
        // Show the alert when the inquiry is submitted
        alert("Your inquiry has been submitted!");
        setSubmitted(true);
        setInquiry(''); // Clear the input field
    };

    return (
        <>
            <GeneralNavbar/>
            <div style={styles.faqContainer}>
                <h1>Frequently Asked Questions</h1>
                {questions.map((item, index) => (
                    <div key={index} style={styles.faqItem}>
                        <div
                            style={styles.faqQuestion}
                            onClick={() => toggleQuestion(index)}
                        >
                            {item.question}
                            <button style={styles.faqToggle}>
                                {activeIndex === index ? '-' : '+'}
                            </button>
                        </div>
                        {activeIndex === index && (
                            <div style={styles.faqAnswer}>
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
                <div style={styles.section}>
                    <h2>Videos, Talks, Workshops and Alike</h2>
                    <ul style={styles.videoList}>
                        <li>
                            <a href="https://opensource.com/article/20/11/home-assistant" target="_blank" style={styles.link} rel="noreferrer">
                                Why I use Home Assistant for open source home automation - November 2020
                            </a>
                        </li>
                        <li>
                            <a href="https://smarthome.university/smartthings-vs-home-assistant/" target="_blank" style={styles.link} rel="noreferrer">
                                SmartThings vs Home Assistant - April 2018
                            </a>
                        </li>
                        <li>
                            <a href="https://slides.com/teagan42/life_automation" target="_blank" style={styles.link} rel="noreferrer">
                                Automating Your Life - Home Automation at Develop Denver 2016 - August
                            </a>
                        </li>
                        <li>
                            <a href="https://medium.com/@gitter/building-online-communities-home-assistant-8818dff671ad#.och4x4rhx" target="_blank" style={styles.link} rel="noreferrer">
                                Building Online Communities: Home Assistant - July 2016
                            </a>
                        </li>
                    </ul>
                </div>
                <div style={styles.inquirySection}>
                    <h2>If you have any further inquiries, please type here:</h2>
                    <form onSubmit={handleSubmitInquiry}>
                        <textarea 
                            style={styles.inquiryInput}
                            value={inquiry} 
                            onChange={handleInquiryChange} 
                            placeholder="Enter your inquiry here..."
                            required
                        />
                        <button style={styles.submitButton} type="submit">Submit</button>
                    </form>
                    {submitted && <p style={styles.submittedMessage}>Your inquiry has been submitted!</p>}
                </div>
            </div>
        </>
    );
};

const styles = {
    faqContainer: {
        width: '80%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        color: 'black',
        marginTop: '60px',
    },
    faqItem: {
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    faqQuestion: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 15px',
        backgroundColor: 'beige',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    faqToggle: {
        background: 'light blue',
        shape: 'circle',
        border: '#007bff',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    faqAnswer: {
        padding: '10px 15px',
        backgroundColor: 'white',
        borderTop: '1px solid #ddd',
        fontSize: '14px',
        color: '#555',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    section: {
        marginTop: '30px',
    },
    videoList: {
        color: '#0056b3', /* Blue color */
    },
    inquirySection: {
        marginTop: '30px',
    },
    inquiryInput: {
        width: '100%',
        height: '100px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '14px',
        marginBottom: '10px',
    },
    submitButton: {
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    submittedMessage: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
};

export default Help;