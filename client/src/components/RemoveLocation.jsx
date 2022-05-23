import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

const RemoveLocation = props => {
    const userContext = useContext(UserContext);
    const { city, onSubmitProp } = props;

    function handleRemoveLocation(e){
        e.preventDefault();

        console.log(props);

        axios.put("http://localhost:8000/api/users/update/" + userContext.user._id, {
            "$pull": {
                locations: {
                    "city": city
                }
            } 
        })
        .then(res => {
            userContext.setUser(res.data.user);
            onSubmitProp();
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="m-auto">
            <a href="#" onClick={ e => handleRemoveLocation(e) }>Remove City</a>
        </div>
    );
}

export default RemoveLocation;