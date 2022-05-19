const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

module.exports.findAllUsers = (req, res) => {
User.find()
    .then(allDaUsers => res.json({ users: allDaUsers }))
    .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => res.json({ user: oneSingleUser }))
        .catch(err => res.json({ message: "Something went wrong", error: err }));
};

module.exports.registerNewUser = (req, res) => {
User.create(req.body)
    .then(newlyCreatedUser => {

        const userToken = jwt.sign({
            id: newlyCreatedUser._id
        }, secret);

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