const APIController = require("../controllers/apis.controller");

module.exports = app => {
    app.get("/api/getweather/:lat/:lng/:pref", APIController.getWeather);
    app.get("/api/getlocation/:lat/:lng", APIController.getLocation);
};