import React from 'react';

const OneDayCard = props => {
    const { weatherData, preference } = props;

    console.log(weatherData);

    return (
        <div className="border p-5 w-75 m-auto rounded">
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
    );
}