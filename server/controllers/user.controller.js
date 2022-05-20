const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.findAllUsers = (req, res) => {
User.find()
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
    const decodedJwt = jwt.decode(req.cookies.usertoken, {complete:true});

    User.findOne({ _id: decodedJwt.payload.id })
        .then(oneSingleUser => res.json({ user: {
            id: oneSingleUser._id,
            firstName: oneSingleUser.firstName,
            locations: oneSingleUser.locations,
            preference: oneSingleUser.preference
        }}))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.registerNewUser = (req, res) => {
User.create(req.body)
    .then(newlyCreatedUser => {

        const userToken = jwt.sign({
            id: newlyCreatedUser._id,
            firstName: newlyCreatedUser.firstName,
            locations: newlyCreatedUser.locations,
            preference: newlyCreatedUser.preference
        }, process.env.SECRET_KEY);

        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
            .json({ msg: "user registered successfully", user: newlyCreatedUser })
    })
    .catch(err => res.status(400).json(err));
};

module.exports.updateExistingUser = (req, res) => {
User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(updatedUser => res.json({ user: updatedUser }))
    .catch(err => res.status(400).json(err));
};

module.exports.deleteAnExistingUser = (req, res) => {
User.deleteOne({ _id: req.params.id })
    .then(result => res.json({ result: result }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if(user === null){
        // email not found in users collection
        return res.status(400).json({message: "Invalid email/password"});
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.status(400).json({message: "Invalid email/password"});
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id,
        firstName: user.firstName,
        locations: user.locations,
        preference: user.preference
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, process.env.SECRET_KEY, {httpOnly: true})
        .json({ msg: "Successfully logged in." });
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}