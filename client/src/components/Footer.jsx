import React from 'react';
import Card from 'react-bootstrap/Card';
import GitHub_Logo from '../images/GitHub_Logo.png';
import LI_Logo from '../images/LI_Logo.png';

const Footer = () => {
    return (
        <Card>
            <Card.Footer className="text-muted d-flex justify-content-between pt-3">
                <div className="d-flex flex-column d-none d-sm-block">
                    <p className="mb-1">Front-end created using React</p>
                    <p className="mb-1">Back-end created using MongoDB, Express, and Node.js</p>
                    <p className="mb-0">Powered by OpenWeather and Google Maps APIs</p>
                </div>
                <div className="d-flex flex-sm-column justify-content-sm-evenly align-items-center">
                    <a href="https://www.linkedin.com/in/nathan-prater-4a7533114/" target="_blank"><img src={LI_Logo} alt="" className="logoLink"/></a>
                    <a href="https://github.com/nprater86/dojo_weather_mern.git" target="_blank"><img src={GitHub_Logo} alt="" className="logoLink"/></a>
                </div>
            </Card.Footer>
        </Card>

    );
}

export default Footer;