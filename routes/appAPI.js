const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const compController = require('../controllers/competenceController')


/**
 * Route for getting all competence profiles in database
 * 
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 * 
 * @return 400: User is not logged in.
 * @return 400: User does not have a token, and is thus logged out.
 * @return 200: Competence profiles sent.
 * @return 400: JWT error
 * @return 401: User is not authorized.
 * @return 500: Server error. 
 */
router.get("/app/competences", async (req,res) => {
    try {
        const token = req.cookies["access_token"]
        if (!token) {
            res.status(200).json({
                serverMessage: {
                    isError: true,
                    msgBody: "login.false",
                    code: 400
                }
            })
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)
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

/**
 * Route for changing status of a competence profile
 * 
 * @param {String} endpoint url endpoint.
 * @param req Express request object.
 * @param res Express request object.
 * 
 * @return 400: User is not logged in.
 * @return 400: User does not have a token, and is thus logged out.
 * @return 200: Competence profile has successfully changed status
 * @return 400: JWT error
 * @return 401: User is not authorized.
 * @return 500: Server error. 
 */


router.post('/app/changestatus', async (req, res) => {
    console.log(" POST /app/changestatus");
    console.log(req.body)
    try {
        const token = req.cookies["access_token"]
        if (!token) {
            res.status(200).json({
                serverMessage: {
                    isError: false,
                    msgBody: "login.false",
                    code: 400
                }
            })
        }
        else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded)
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
                let result = await compController.changeApplicationStatus(req.body)
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