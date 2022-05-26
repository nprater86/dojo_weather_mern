import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import UserContext from '../context/UserContext';
import AddLocation from './AddLocation';
import RemoveLocation from './RemoveLocation';
import loadingbar1 from '../images/loadingbar1.gif';

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

        const weatherResult = await axios.get(`http://localhost:8000/api/getweather/${lat}/${lng}/${userContext.preference}`);
        setWeatherData(weatherResult.data);

        const reverseGeoResults = await axios.get(`http://localhost:8000/api/getlocation/${lat}/${lng}`);
        const formatted_address = reverseGeoResults.data.results[0].formatted_address.split(",");
        const target_address = [];
        const target_city = formatted_address[formatted_address.length-3].trim();
        target_address.push(target_city);
        const target_state = formatted_address[formatted_address.length-2].trim().split(" ");
        target_address.push(target_state[0]);
        setCity(target_address.join(", "));
        setLoaded(true);
    }, [userContext.preference, lat, lng, userContext.loggedIn]);

    useEffect(()=> {
        if (loaded && userContext.user.locations){
            userContext.user.locations.map((location) => {
                if(location.city === city){
                    setCityInLocations(true);
                }
            })
        }
    }, [loaded, city, cityInLocations, userContext.loggedIn]);

    function handleAddLocation(){
        setCityInLocations(true);
    }

    function handleRemoveLocation(){
        setCityInLocations(false);
    }

    return (
    <div>
        { loaded ? 
        <div className="w-75 m-auto">
            <div className="row border rounded p-5 mb-3 d-flex justify-content-center">
                <div className="row">
                    <div className="d-flex col-auto m-auto mb-3 flex-wrap justify-content-center">
                        <h1 className="me-3 mb-0 text-nowrap">{ city }</h1>
                        { userContext.loggedIn && 
                            <div className="d-flex align-items-center">
                                { cityInLocations ? 
                                <RemoveLocation onSubmitProp={ handleRemoveLocation } city={city}><i className="fa-solid fa-star"></i></RemoveLocation> :
                                <AddLocation onSubmitProp={ handleAddLocation } city={city} lat={lat} lng={lng}><i className="fa-regular fa-star"></i></AddLocation>
                                }
                            </div>
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
            <div className="row border rounded p-5 mb-3 d-flex justify-content-center">
                <div className="row d-flex">
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
                        if (i > 0 && i <= 24){
                            return (
                                <div key={i} className="col-lg-1 col-3">
                                    <div className="row text-center">
                                        <h6>{hours + amPm}</h6>
                                    </div>
                                    <div className="row">
                                        <img className="img-fluid d-none d-sm-block" src={"http://openweathermap.org/img/wn/" + hour.weather[0].icon + "@2x.png"} />
                                    </div>
                                    <div className="row text-center">
                                        <div className="col">{Math.round(hour.temp)}&deg;</div>
                                    </div>
                                    <div className="row text-center">
                                        <p>{ Math.round((weatherData.hourly[i].pop)*100) }%</p>
                                    </div>
                                </div>
                                )
                        }
                    })}
                </div>
            </div>
            <div className="row border rounded p-5 mb-3 d-flex d-flex justify-content-center">
                {
                    weatherData.daily.map((day,i) => {
                        if (i > 0 && i <= 5){
                            return (
                                <div className="col-2 m-auto" key={i}>
                                    <div className="row m-auto text-center">
                                        <h6>{ Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(weatherData.daily[i].dt*1000)) }</h6>
                                    </div>
                                    <div className="row">
                                        <img className="img-fluid d-none d-sm-block" src={"http://openweathermap.org/img/wn/" + weatherData.daily[i].weather[0].icon + "@2x.png"} />
                                    </div>
                                    <div className="row d-flex text-center">
                                        <div className="col">{ Math.round(weatherData.daily[i].temp.max) }&deg;</div>
                                        <div className="col">{ Math.round(weatherData.daily[i].temp.min) }&deg;</div>
                                    </div>
                                    <div className="row text-center">
                                        <p><span className="d-none d-lg-inline">rain</span> { Math.round((weatherData.daily[i].pop)*100) }%</p>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div> :
        <div className="text-center">
            <img src={loadingbar1} />
        </div>
        }
    </div>
    );
}

export default OneDayCard;