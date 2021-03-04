const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const compController = require('../controllers/competenceController')

router.get("/app/competences", async (req,res) => {
    try {
        const token = req.cookies["access_token"]
        if (!token) {
            res.status(200).json({
                serverMessage: {
                    isError: false,
                    msgBody: "login.false",
                    code: 200
                }
            })
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            if (decoded.role != 'recruiter') {
                res.status(401).json({
                    serverMessage: {
                        isError: false,
                        msgBody: 'access.unauthorized',
                        code: 401
                    }
                })
            }
            else {
                let result = await compController.getAllCompetences()
                res.status(200).json({
                    serverMessage: result
                })
            }

        }
    }
    catch(error) {
        console.log(error)
        if (error.code || error.name === 'JsonWebTokenError') {
            res.status(400).json({
                serverMessage: {
                    isError: true,
                    msgBody: "error.token",//"User has supplied an invalid token",
                    code: 400
                }
            });
        } else {
            res.status(500).json({
                serverMessage: {
                    isError: true,
                    msgBody: 'error.unexpected',
                    code: 500
                }
            })
        }
    }
})


module.exports = router;