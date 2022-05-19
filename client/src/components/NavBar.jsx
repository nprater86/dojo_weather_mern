import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info mb-3">
                <div className="container d-flex">
                    <div className="d-flex align-items-center">
                        <Link to="/" className="text-decoration-none"><h1 className="navbar-brand mb-0">DojoWeather</h1></Link>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search City" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/register" className="text-decoration-none"><p className="nav-link mb-0 active" href="#">Register</p></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="text-decoration-none"><p className="nav-link mb-0 active">Login</p></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;