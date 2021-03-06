import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

const RemoveLocation = props => {
    const userContext = useContext(UserContext);
    const { city, onSubmitProp } = props;

    function handleRemoveLocation(e){
        e.preventDefault();

        axios.put("http://localhost:8000/api/users/update/" + userContext.user._id, {
            "$pull": {
                locations: {
                    "city": city
                }
            } 
        })
        .then(res => {
            userContext.setUser(res.data.user);
            if(onSubmitProp){
                onSubmitProp();
            };
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <a style={{textDecoration: 'none'}} href="#" onClick={ e => handleRemoveLocation(e) }>{ props.children }</a>
        </div>
    );
}

export default RemoveLocation;