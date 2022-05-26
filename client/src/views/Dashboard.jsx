import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import FiveDayCard from '../components/FiveDayCard';
import RemoveLocation from '../components/RemoveLocation';

const Dashboard = props => {
    const userContext = useContext(UserContext);
    const [userLocations, setUserLocations] = useState([]);
    const [loaded, setLoaded] = useState();
    const history = useHistory();

    useEffect(()=> {
        if(!userContext.loggedIn){
            history.push("/");
        } else {
            setLoaded(true);
        }
    }, []);

    useEffect(()=> {
        if(userContext.user.locations){
            setUserLocations(userContext.user.locations.sort( (a,b) => a.city.localeCompare(b.city)));
        }
    }, [userContext]);

    return (
        <div>
            <h1 className="text-center mb-3">Dashboard</h1>
            { userContext.user.locations &&
                <>
                    { loaded && 
                        <>
                            {userContext.user.locations.length > 0 ?
                                <div className="d-flex justify-content-center">
                                    <ol className="w-75">
                                        {
                                            userLocations.map( (location, i) => {
                                                return (
                                                    <div key={i} id={"savedLocation" + i }>
                                                        <div className="d-flex justify-content-between align-items-end">
                                                            <h4>{location.city}</h4>
                                                            <RemoveLocation city={location.city}><i className="fa-regular fa-trash-can"></i></RemoveLocation>
                                                        </div>
                                                        <Link style={{textDecoration: "none", color: "black"}} to={"/day/" + location.lat + "/" + location.lng}>
                                                            <FiveDayCard lat={ location.lat } lng={ location.lng } />
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }
                                    </ol>
                                </div> :
                                <h4 className="text-center">Click on a star to add locations to your dashboard!</h4>
                            }
                        </>
                    }
                </>
            }
        </div>
    );
}

export default Dashboard;