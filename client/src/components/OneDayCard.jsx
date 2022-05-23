import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import UserContext from '../context/UserContext';
import RemoveLocation from './RemoveLocation';

const OneDayCard = props => {
    const userContext = useContext(UserContext);
    const [weatherData, setWeatherData] = useState();
    const [city, setCity] = useState("");
    const [cityInLocations, setCityInLocations] = useState(false);
    const [loaded, setLoaded] = useState();
    const { lat, lng } = useParams();

    useEffect(async () => {
        setLoaded(false);
        setCityInLocations(false);

        const weatherResult = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=2f5c71d5d96169baf744185a2ea344c7&units=${userContext.user.preference}`);
        setWeatherData(weatherResult.data);

        const reverseGeoResults = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyD8k_gpcxH7yrSqL0rkEFyKgDPi_yDNyaw`);
        const formatted_address = reverseGeoResults.data.results[0].formatted_address.split(",");
        const target_address = [];
        const target_city = formatted_address[formatted_address.length-3].trim();
        target_address.push(target_city);
        const target_state = formatted_address[formatted_address.length-2].trim().split(" ");
        target_address.push(target_state[0]);
        setCity(target_address.join(", "));
        setLoaded(true);
    }, [userContext.user.preference, lat, lng])

    useEffect(()=> {
        if (loaded && userContext.user.locations !== undefined){
            userContext.user.locations.map((location) => {
                if(location.city === city){
                    setCityInLocations(true);
                }
            })
        }
    }, [loaded, city, cityInLocations]);

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
            setCityInLocations(true);
        })
        .catch(err => console.error(err));
    }

    function handleRemoveLocation(){
        setCityInLocations(false);
    }

    return (
    <div>
        { loaded && 
        <div className="w-75 m-auto ">
            <div className="row border rounded p-5 mb-3">
                <div className="row">
                    <div className="d-flex flex-column col-auto m-auto mb-3">
                        <h1>{ city }</h1>
                        { cityInLocations ? 
                        <RemoveLocation onSubmitProp={ handleRemoveLocation } city={city} /> :
                        <a className="m-auto" href="#" onClick={ e => handleAddLocation(e) }>Add City</a>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto m-auto text-center">
                        <h1>{ Math.round(weatherData.current.temp) }&deg;</h1>
                        <img src={"http://openweathermap.org/img/wn/" + weatherData.current.weather[0].icon + "@2x.png"} />
                        <h4>{weatherData.current.weather[0].description}</h4>
                        <div className="div d-flex justify-content-between gap-4">
                            <h4>High {Math.round(weatherData.daily[0].temp.max)}&deg;</h4>
                            <h4>Low {Math.round(weatherData.daily[0].temp.min)}&deg;</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row border rounded p-5 mb-3 d-flex">
                <div className="row mb-5">
                    { weatherData.hourly.map( (hour,i) => {
                        const date = new Date(hour.dt*1000);
                        let hours = date.getHours();
                        let amPm;
                        if (hours >= 12){
                            amPm = "pm";
                        } else {
                            amPm = "am";
                        }
                        if (hours > 12){
                            hours -= 12;
                        }
                        if (hours === 0){
                            hours = 12;
                        }
                        if (i > 0 && i <= 12){
                            return (
                                <div key={i} className="col-1">
                                    <div className="row">
                                        <h6>{hours + amPm}</h6>
                                    </div>
                                    <div className="row">
                                        <img src={"http://openweathermap.org/img/wn/" + hour.weather[0].icon + "@2x.png"} />
                                    </div>
                                    <div className="row m-auto">
                                        <div className="col">{Math.round(hour.temp)}&deg;</div>
                                    </div>
                                </div>
                                )
                        }
                    })}
                </div>
                <div className="row">
                { weatherData.hourly.map( (hour,i) => {
                    const date = new Date(hour.dt*1000);
                    let hours = date.getHours();
                    let amPm = "am";

                    if (hours >= 12){
                        amPm = "pm";
                    } else {
                        amPm = "am";
                    }

                    if (hours > 12){
                        hours -= 12;
                    }

                    if (hours === 0){
                        hours = 12;
                    }

                    if (i > 12 && i <= 24){
                        return (
                            <div key={i} className="col-1">
                                <div className="row">
                                    <h6>{hours + amPm}</h6>
                                </div>
                                <div className="row">
                                    <img src={"http://openweathermap.org/img/wn/" + hour.weather[0].icon + "@2x.png"} />
                                </div>
                                <div className="row m-auto">
                                    <div className="col">{Math.round(hour.temp)}&deg;</div>
                                </div>
                            </div>
                            )
                    }
                })}
                </div>
            </div>
            <div className="row border rounded p-5 mb-3 d-flex">
                {
                    weatherData.daily.map((day,i) => {
                        if (i > 0 && i <= 5){
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
        </div>}
    </div>
    );
}

export default OneDayCard;