
const express = require("express");
const User = require("../../Models/userModel");
const router = express.Router();
const userExist = require("../../middlewares/userExist");
const bcrypt = require("bcrypt");
module.exports = router;

router.post("/", userExist, async (req, res) => {
    if (req.success) {
        res.send({
            success: false,
            payload: "User with that email already exists.",
        });
    } else {
        const { email, password,name } = req.body;
// console.log(req.body);
        const newuser = new User({
            email,
            password,
            name
        });
        newuser.password = await bcrypt.hash(newuser.password, 10);

        const response = await newuser.save();
        res.send({ payload: response, success: true });
    }
});
