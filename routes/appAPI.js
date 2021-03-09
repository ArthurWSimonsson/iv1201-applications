const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const compController = require("../controllers/competenceController");

const responseHandler = require("./serverResponses/responseHandler");
const {
    tokenValidationSchema,
    statusChangeValidationSchema,
    isValidationError,
} = require("../utils/validation");

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
router.post("/app/competences", async (req, res) => {
    try {
        const validatedRequest = await tokenValidationSchema.validateAsync(
            req.body
        );
        const token = validatedRequest.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "recruiter") {
            responseHandler.sendResponse(
                {
                    isError: false,
                    msgBody: "access.unauthorized",
                    code: 401,
                },
                res
            );
        } else {
            const result = await compController.getAllCompetences();
            responseHandler.sendResponse(result, res);
        }
    } catch (error) {
        console.log(error);
        if (error.code || error.name === "JsonWebTokenError") {
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody: "error.token", //"User has supplied an invalid token",
                    code: 400,
                },
                res
            );
        } else if (isValidationError(error)) {
            responseHandler.sendResponse(
                {
                    isError: true,
                    accepted: false,
                    msgBody: "error.badRequest",
                    code: 400,
                },
                res
            );
        } else {
            responseHandler.sendResponse(
                { isError: true, msgBody: "error.unexpected", code: 500 },
                res
            );
        }
    }
});

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

router.post("/app/changestatus", async (req, res) => {
    console.log(" POST /app/changestatus");
    console.log(req.body);
    try {
        const validatedRequest = await statusChangeValidationSchema.validateAsync(
            req.body
        );
        const token = validatedRequest.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role != "recruiter") {
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody: "access.unauthorized",
                    code: 401,
                },
                res
            );
        } else {
            const result = await compController.changeApplicationStatus(
                req.body
            );
            responseHandler.sendResponse(result, res);
        }
    } catch (error) {
        console.log(error);
        if (error.code || error.name === "JsonWebTokenError") {
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody: "error.token", //"User has supplied an invalid token",
                    code: 400,
                },
                res
            );
        } else if (isValidationError(error)) {
            responseHandler.sendResponse(
                {
                    isError: true,
                    accepted: false,
                    msgBody: "error.badRequest",
                    code: 400,
                },
                res
            );
        } else {
            responseHandler.sendResponse(
                {
                    isError: true,
                    msgBody: "error.unexpected",
                    code: 500,
                },
                res
            );
        }
    }
});

module.exports = router;
