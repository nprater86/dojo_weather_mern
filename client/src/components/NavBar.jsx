import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import SearchLocationInput from './SearchLocationInput';
import UserContext from '../context/UserContext';
import axios from 'axios';

const NavBar = props => {
    const userContext = useContext(UserContext);
    const history = useHistory();

    //will bring user to the url specific in the onClick event listener
    function handleLink(e,url){
        e.preventDefault();
        history.push(url);
    }

    //will log the user out
    function handleLogout(e){
        e.preventDefault();

        axios.get("http://localhost:8000/api/users/logout", {withCredentials: true})
            .then(res => {
                console.log("User logged out successfully -->", res);
                userContext.setLoggedIn(false);
                userContext.setUser({});
                userContext.setPreference("imperial");
                history.push("/");
            })
            .catch(err => console.error(err))
    }

    //handle preference change
    function handlePrefChange(e){
        userContext.setPreference(e.target.value);
    }

    return (
        <div>
            <Navbar variant="dark" bg="info" className="mb-3">
                <Container className="flex-wrap flex-md-nowrap">
                    <div className="d-flex align-items-center flex-wrap flex-sm-nowrap">
                        <Link to="/" className="text-decoration-none"><Navbar.Brand id="logo">Dojo<em>Weather</em></Navbar.Brand></Link>
                        <SearchLocationInput />
                    </div>
                    { userContext.loggedIn ?
                        <div className="ms-auto">
                            <Navbar.Collapse>
                                <Nav>
                                    <NavDropdown title={"Welcome, " +  userContext.user.firstName + "!"} menuVariant="light">
                                    <NavDropdown.Item href="#" onClick={ e => handleLink(e, "/dashboard") }>My Dashboard</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#" onClick={ e => handleLink(e, "/user/preferences") }>Preferences</NavDropdown.Item>
                                        <NavDropdown.Item href="#" onClick={ e => handleLogout(e) }>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                        :
                        <ul className="navbar-nav">
                            <li className="nav-item me-3">
                                <select onChange={ e => handlePrefChange(e) } className="form-select" aria-label="select temperature scale">
                                    { userContext.preference === "imperial" ? <option value="imperial" defaultValue>&deg;F</option> : <option value="imperial">&deg;F</option> }
                                    { userContext.preference === "metric" ? <option value="metric" defaultValue>&deg;C</option> : <option value="metric">&deg;C</option> }
                                </select>
                            </li>
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