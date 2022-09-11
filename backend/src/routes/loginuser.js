const express = require('express')
const router = express.Router()
const userExist = require("../../middlewares/userExist")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const privateKey = "hunfaisagoodboy";

router.post("/", userExist, async (req, res) => {
    if (req.success) {
        const { password } = req.body;
        const match = await bcrypt.compare(password, req.user.password);

        if (match) 
        {
            const token = jwt.sign({ email: req.user.email, _id: req.user._id }, privateKey);
            res.send({
                success: true,
                payload: {
                    token,
                    user:req.user
                }
            });
        }
        else {
            res.send({ success: false, payload: "Invalid Password" });
        }

    }
    else {
        res.send({ success: false, payload: "Invalid Email" });
    }


});

module.exports = router;