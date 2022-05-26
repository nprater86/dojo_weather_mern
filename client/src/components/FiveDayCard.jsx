import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import loadingbar1 from '../images/loadingbar1.gif';
import axios from 'axios';

const FiveDayCard = props => {
    const userContext = useContext(UserContext);
    const { lat, lng } = props;
    const [weatherData, setWeatherData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        const weatherResult = await axios.get(`http://localhost:8000/api/getweather/${lat}/${lng}/${userContext.preference}`);
        setWeatherData(weatherResult.data);
        setLoaded(true);
    }, [])

    return (
        <div>
            { loaded ?
            <div className="row border rounded p-3 mb-5 d-flex">
                {
                    weatherData.daily.map((day,i) => {
                        if (i < 5){
                            return (
                                <div className="col-2 m-auto" key={i}>
                                    <div className="row text-center">
                                        <h6>{ Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(weatherData.daily[i].dt*1000)) }</h6>
                                    </div>
                                    <div className="row">
                                        <img className="d-none d-sm-block" src={"http://openweathermap.org/img/wn/" + weatherData.daily[i].weather[0].icon + "@2x.png"} />
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col text-center">{ Math.round(weatherData.daily[i].temp.max) }&deg;</div>
                                        <div className="col text-center">{ Math.round(weatherData.daily[i].temp.min) }&deg;</div>
                                    </div>
                                    <div className="row text-center">
                                        <p><span className="d-none d-lg-inline">rain</span> { Math.round((weatherData.daily[i].pop)*100) }%</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div> :
            <div className="text-center">
                <img src={loadingbar1} />
            </div>
            }
        </div>
    );
}

export default FiveDayCard;