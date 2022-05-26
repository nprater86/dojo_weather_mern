import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

const RegistrationForm = props => {
    const userContext = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

    function onSubmitHandler(e){
        e.preventDefault();

        const user = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            preference: "imperial"
        }

        axios.post('http://localhost:8000/api/users/new', user, {withCredentials: true})
            .then(res => {
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setErrors({});
                userContext.setUser(res.data.user);
                userContext.setLoggedIn(true);
                history.push("/");
            })
            .catch(err => {
                console.error(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    }


    return (
        <div className="w-50 bg-info p-5 rounded m-auto">
            <h1 className="mb-3 text-light">Registration</h1>
            <form onSubmit={ e => onSubmitHandler(e) }>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">First Name:</label>
                    <input type="text" className="form-control" onChange={ e => setFirstName(e.target.value) } value={ firstName }/>
                    { errors.firstName && <p className="text-light" style={{fontWeight:"bold"}}>{ errors.firstName.message }</p> }
                </div>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">Last Name:</label>
                    <input type="text" className="form-control" onChange={ e => setLastName(e.target.value) } value={ lastName }/>
                    { errors.lastName && <p className="text-light" style={{fontWeight:"bold"}}>{ errors.lastName.message }</p> }
                </div>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" onChange={ e => setEmail(e.target.value) } value={ email }/>
                    { errors.email && <p className="text-light" style={{fontWeight:"bold"}}>{ errors.email.message }</p> }
                </div>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" onChange={ e => setPassword(e.target.value) } value={ password }/>
                </div>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">Confirm Password:</label>
                    <input type="password" className="form-control" onChange={ e => setConfirmPassword(e.target.value) } value={ confirmPassword }/>
                    { errors.password && <p className="text-light" style={{fontWeight:"bold"}}>{ errors.password.message }</p> }
                    { errors.confirmPassword && <p className="text-light" style={{fontWeight:"bold"}}>{ errors.confirmPassword.message }</p> }
                </div>
                <button type="submit" className="btn btn-primary ms-5">Register</button>
            </form>
        </div>
    );
}

export default RegistrationForm;