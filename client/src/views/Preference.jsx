import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Preference = props => {
    const userContext = useContext(UserContext);
    const [preference, setPreference] = useState(userContext.user.preference);
    const history = useHistory();

    useEffect(()=> {
        if(!userContext.loggedIn){
            history.push("/");
        }
    }, []);

    function handlePreferenceChange(e){
        e.preventDefault();

        axios.put("http://localhost:8000/api/users/update/" + userContext.user._id, { preference:preference })
            .then(res => {
                userContext.setUser(res.data.user);
                userContext.setPreference(preference);
                history.goBack();
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <h4 className="mb-3">Preferences:</h4>
            <form onSubmit={ e => handlePreferenceChange(e) }>
                <h6>Temperature Scale</h6>
                <div className="mb-3">
                    <div className="form-check">
                        {preference === "imperial" ?
                        <input className="form-check-input" name="preference" type="radio" id="imperial" value="imperial" onClick={ e => setPreference(e.target.value) } defaultChecked/> :
                        <input className="form-check-input" name="preference" type="radio" id="imperial" value="imperial" onClick={ e => setPreference(e.target.value) } />
                        }
                    
                        <label className="form-check-label" htmlFor="imperial">
                            Fahrenheit
                        </label>
                    </div>
                    <div className="form-check">
                        {preference === "metric" ?
                        <input className="form-check-input" name="preference" type="radio" id="metric" value="metric" onClick={ e => setPreference(e.target.value) } defaultChecked/> :
                        <input className="form-check-input" name="preference" type="radio" id="metric" value="metric" onClick={ e => setPreference(e.target.value) } />
                        }
                        <label className="form-check-label" htmlFor="metric">
                            Celsius
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default Preference;