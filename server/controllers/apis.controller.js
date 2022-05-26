const axios = require('axios');

module.exports.getWeather = (req, res) => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lng}&exclude=minutely&appid=${process.env.OPEN_WEATHER_KEY}&units=${req.params.pref}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.getLocation = (req, res) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.params.lat},${req.params.lng}&key=${process.env.GOOGLE_MAPS_KEY}`)
        .then(response => {
            res.json(response.data);
        })
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};