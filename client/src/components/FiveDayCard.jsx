import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import axios from 'axios';

const FiveDayCard = props => {
    const userContext = useContext(UserContext);
    const { lat, lng } = props;
    const [weatherData, setWeatherData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        const weatherResult = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=2f5c71d5d96169baf744185a2ea344c7&units=${userContext.user.preference}`);
        setWeatherData(weatherResult.data);
        setLoaded(true);
    }, [])

    return (
        <div>
            { loaded &&
            <div className="row border rounded p-5 mb-5 d-flex">
                {
                    weatherData.daily.map((day,i) => {
                        if (i < 5){
                            return (
                                <div className="col-2 m-auto" key={i}>
                                    <div className="row m-auto text-center">
                                        <h6>{ Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(weatherData.daily[i].dt*1000)) }</h6>
                                    </div>
                                    <div className="row">
                                        <img src={"http://openweathermap.org/img/wn/" + weatherData.daily[i].weather[0].icon + "@2x.png"} />
                                    </div>
                                    <div className="row d-flex text-center">
                                        <div className="col">{ Math.round(weatherData.daily[i].temp.max) }&deg;</div>
                                        <div className="col">{ Math.round(weatherData.daily[i].temp.min) }&deg;</div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            }
        </div>
    );
}

export default FiveDayCard;