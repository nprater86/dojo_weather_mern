import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginForm = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

    function onSubmitHandler(e){
        e.preventDefault();

        const user = {
            email,
            password
        }

        axios.post('http://localhost:8000/api/users/login', user, {withCredentials: true})
            .then(res => {
                console.log(res);
                setEmail("");
                setPassword("");
                props.onSubmitProp();
                history.push("/");
            })
            .catch(err => {
                console.error(err.response.data);
                setErrors(err.response.data);
            })

    }


    return (
        <div className="w-50 bg-info p-5 rounded m-auto">
            <h1 className="mb-3 text-light">Login</h1>
            <form onSubmit={ e => onSubmitHandler(e) }>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" onChange={ e => setEmail(e.target.value) } value={ email }/>
                </div>
                <div className="ms-5 me-5 mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" onChange={ e => setPassword(e.target.value) } value={ password }/>
                    { errors.message && <p className="text-light" style={{fontWeight:"bold"}}>{ errors.message }</p> }
                </div>
                <button type="submit" className="btn btn-primary ms-5">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;