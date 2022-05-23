import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import FiveDayCard from '../components/FiveDayCard';

const Dashboard = props => {
    const userContext = useContext(UserContext);
    const [userLocations, setUserLocations] = useState([]);
    const [loaded, setLoaded] = useState();
    const history = useHistory();

    useEffect(()=> {
        if(userContext.user === undefined){
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
            { loaded && 
                <div>
                    <ol>
                        {
                            userLocations.map( (location, i) => {
                                return (
                                    <div>
                                        <h4>{location.city}</h4>
                                        <Link style={{textDecoration: "none", color: "black"}} to={"/day/" + location.lat + "/" + location.lng}>
                                            <FiveDayCard lat={ location.lat } lng={ location.lng } />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </ol>
                </div>
            }
        </div>
    );
}

export default Dashboard;