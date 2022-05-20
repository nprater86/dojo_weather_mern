const UserController = require("../controllers/user.controller");

module.exports = app => {
    app.get("/api/users/", UserController.findAllUsers);
    app.post("/api/users/new", UserController.registerNewUser);
    app.post("/api/users/login", UserController.login);
    app.get("/api/users/logout", UserController.logout);
    app.get("/api/users/getuser", UserController.findOneSingleUser);
    app.put("/api/users/update/:id", UserController.updateExistingUser);
    app.delete("/api/users/delete/:id", UserController.deleteAnExistingUser);
};