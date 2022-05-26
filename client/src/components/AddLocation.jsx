import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

const AddLocation = props => {
    const userContext = useContext(UserContext);
    const { city, lat, lng, onSubmitProp } = props;

    function handleAddLocation(e){
        e.preventDefault();

        axios.put("http://localhost:8000/api/users/update/" + userContext.user._id, {
            "$push": {
                locations: {
                    "city": city, 
                    "lat": lat, 
                    "lng": lng
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
        <div className="m-auto d-flex align-items-center">
            <a className="m-auto" href="#" onClick={ e => handleAddLocation(e) }>{ props.children }</a>
        </div>
    );
}

export default AddLocation