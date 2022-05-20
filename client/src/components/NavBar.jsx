import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import SearchLocationInput from './SearchLocationInput';
import axios from 'axios';

const NavBar = props => {
    const { loggedIn, user } = props;
    const history = useHistory();
    const [geolocation, setGeolocation] = useState({});

    //will bring user to dashboard
    function handleDashboard(e){
        e.preventDefault();
        history.push("/dashboard");
    }

    //will log the user out, and pass the logout back to the app
    function handleLogout(e){
        e.preventDefault();

        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(res => {
                console.log("User logged out successfully -->", res);
                props.passbackLogout();
                history.push("/");
            })
            .catch(err => console.error(err))
    }

    //will use this to call the open weather api
    function handleLocationSubmit(e){
        e.preventDefault();
        console.log(geolocation);
    }

    //use this to get the geolocation data from google maps API in the SearchLocation component
    function passbackGeolocation(location){
        setGeolocation(location);
    }

    return (
        <div>
            <Navbar variant="dark" bg="info" expand="lg" className="mb-3">
                <Container>
                    <div className="d-flex align-items-center">
                        <Link to="/" className="text-decoration-none"><Navbar.Brand id="logo">DojoWeather</Navbar.Brand></Link>
                        <form className="d-flex" onSubmit={ e => handleLocationSubmit(e) }>
                            <SearchLocationInput passbackGeolocation={ passbackGeolocation }/>
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                    { loggedIn ?
                        <div className="ms-auto">
                            <Navbar.Collapse>
                                <Nav>
                                    <NavDropdown title={"Welcome, " +  user.firstName + "!"} menuVariant="light">
                                    <NavDropdown.Item href="#" onClick={ e => handleDashboard(e) }>My Dashboard</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#" onClick={ e => handleLogout(e) }>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                        :
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/register" className="text-decoration-none"><p className="nav-link mb-0 active" href="#">Register</p></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="text-decoration-none"><p className="nav-link mb-0 active">Login</p></Link>
                            </li>
                        </ul>
                    }
                </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;