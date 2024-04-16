<<<<<<< HEAD
 const express = require('express')
=======
const express = require('express')
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
const router = express.Router()
const userExist = require("../../middlewares/userExist")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const privateKey = "shabigardezi51214";

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