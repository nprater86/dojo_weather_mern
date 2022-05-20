import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = props => {
    const { user } = props
    const [loaded, setLoaded] = useState();
    const history = useHistory();

    useEffect(()=> {
        if(!user){
            history.push("/");
        } else {
            setLoaded(true);
        }
    }, []);

    return (
        <div>
            { loaded && <h3>Welcome, { user.firstName }!</h3> }
        </div>
    );
}

export default Dashboard;