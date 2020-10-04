const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const signin = require("../models/User");
const message = require("../models/User");

router.get("/", (req, res) => {
    res.send("from API route");
});

//Register User
router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new signin(userData);

    signin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Request Not Implemented" });
        } else if (data) {

            res.status(401).json({ message: "Already registered with this email id." });
        } else {
            user.save((error, data1) => {
                if (error) {
                    res.status(500).json({ message: "Request Not Implemented" });
                } else {
                    // authentication
                    let payload = {
                        subject: data1._id
                    };
                    let token = jwt.sign(payload, "registerKey");

                    res.status(200).send({ token: token, message: "Registered Successfully!!!" });
                }
            });
        }
    });
});

//User Login
router.post("/login", (req, res) => {
    let userData = req.body;
    signin.findOne({
        email: userData.email
    }, (error, data) => {
        if (error) {
            res.status(500).json({ message: "Internal Server Error." });
        } else {
            if (!data) {
                res.status(401).json({ message: "Invalid email." });
            } else {
                if (data.password !== userData.password) {
                    res.status(401).json({ message: "Invalid Password." });
                } else {

                    let payload = {
                        subject: data._id
                    };
                    let token = jwt.sign(payload, "registerKey");
                    res.status(200).send({ token: token, message: "LoggedIn!!!", name: data.name, email: data.email, type: data.type });
                }
            }
        }
    });
});



//middleware to verify token
function verifyToken(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "unauthorized request" });
    }
    let token = req.headers.authorization.split(" ")[1];
    if (token === "null") {
        return res.status(401).json({ meassage: "unauthhorized request" });
    }
    let payload = jwt.verify(token, "registerKey");
    if (!payload) {
        return res.status(401).json({ message: "unauthorized request" });
    }
    req.userId = payload.subject;
    next();
}

module.exports = router;