const dbController = require("../controllers/DBController");
const appModule = require('../server')
const request = require('supertest');
const User = require("../models/User");
const tokenHandler = require("../utils/token");
const mongoose = require("mongoose");
const competenceDAO = require('../integration/competenceDAO')
const CompetenceProfile = require('../models/CompetenceProfile');
const ApplicationStatus = require('../models/ApplicationStatus');
const { describe, expect } = require("@jest/globals");
const competenceController = require('../controllers/competenceController')



const app = appModule.app;



beforeAll(async () => {
    return await dbController.jestDB();
});

/**
 * ENDPOINT TESTS
 */


describe('POST Endpoints', () => {
    test('/app/changestatus without valid cookie should fail', async() => {
        let res = await request(app)
        .post('/app/changestatus')
        .send({
            test: 'wrong input'
        })
        expect(res.statusCode).toBe(400)
    })

    test('/app/changestatus with valid cookie should succeed', async() => {
        const foundUser = await User.findOne({email:'admin@admin.com'});
        const token = tokenHandler.generateToken(foundUser._id, 'recruiter');

        let res = await request(app)
        .post('/app/changestatus')
        .set('Cookie', `access_token=${token}`)
        .send({
            id:"6042332978fd99560ccf6f25",
            status:"rejected"
        })
        expect(res.statusCode).toBe(200)
    })

    test('/app/changestatus with unauthorized role should fail', async() => {
        const foundUser = await User.findOne({email:'admin@admin.com'});
        const token = tokenHandler.generateToken(foundUser._id, 'applicant');

        let res = await request(app)
        .post('/app/changestatus')
        .set('Cookie', `access_token=${token}`)
        .send({
            id:"6042332978fd99560ccf6f25",
            status:"rejected"
        })
        expect(res.statusCode).toBe(401)
    })

    test('/app/changestatus with valid cookie but wrong input should fail', async() => {
        const foundUser = await User.findOne({email:'admin@admin.com'});
        const token = tokenHandler.generateToken(foundUser._id, 'recruiter');

        let res = await request(app)
        .post('/app/changestatus')
        .set('Cookie', `access_token=${token}`)
        .send({
            id:"6042332978fd99560ccf6f25",
            status:"unexistantstatus"
        })
        expect(res.statusCode).toBe(500)
    })
})

describe('GET Endpoints', () => {
    test('/app/competences should fail without valid cookie', async () => {
        let res = await request(app)
        .get('/app/competences')

        expect(res.statusCode).toBe(400)
    })

    test('/app/competences should fail without valid cookie', async () => {
        let res = await request(app)
        .get('/app/competences')
        .set('Cookie', `access_token=wrongtoken`)

        expect(res.statusCode).toBe(400)
    })

    test('/app/competences should succeed with valid cookie', async () => {
        const foundUser = await User.findOne({email:'admin@admin.com'});
        const token = tokenHandler.generateToken(foundUser._id, 'recruiter');

        let res = await request(app)
        .get('/app/competences')
        .set('Cookie', `access_token=${token}`)

        expect(res.statusCode).toBe(200)
    })

    test('/app/competences should fail with wrong role', async () => {
        const foundUser = await User.findOne({email:'admin@admin.com'});
        const token = tokenHandler.generateToken(foundUser._id, 'applicant');

        let res = await request(app)
        .get('/app/competences')
        .set('Cookie', `access_token=${token}`)

        expect(res.statusCode).toBe(401)
    })

})

/**
 * INTEGRATION TESTING
 */


describe('get all entries', () => {
    it('should thrown an error without required input', async() => {
        try {
            await competenceDAO.getAllEntries()
        }
        catch(error){
            expect(error).toBeDefined()
        }
    })
    it('should thrown an error with false input', async() => {
        try {
            await competenceDAO.getAllEntries('false')
        }
        catch(error){
            expect(error).toBeDefined()
        }
    })
    it('should return a result with correct input', async() => {
        let result = await competenceDAO.getAllEntries(CompetenceProfile)
        expect(result).toBeDefined()
    })
})



describe('get status id by name', () => {
    it('should thrown an error without required input', async() => {
        try {
            await competenceDAO.getStatusIdbyName()
        }
        catch(error){
            expect(error).toBeDefined()
        }
    })
    it('should thrown an error with false input', async() => {
        try {
            await competenceDAO.getStatusIdbyName(ApplicationStatus, 'false')
        }
        catch(error){
            expect(error).toBeDefined()
        }
    })
    it('should return a result with correct input', async() => {
        let result = await competenceDAO.getStatusIdbyName(ApplicationStatus, 'unhandled')
        expect(result).toBeDefined()

    })
})

describe('change status', () => {
    it('should thrown an error without required input', async() => {
        try {
            await competenceDAO.changeStatus()
        }
        catch(error){
            expect(error).toBeDefined()
        }
    })
    it('should thrown an error with false input', async() => {
        try {
            await competenceDAO.changeStatus(CompetenceProfile, 'false', 'false')
        }
        catch(error){
            expect(error).toBeDefined()
        }
    })
    it('should return a result with correct input', async() => {
        let result = await competenceDAO.changeStatus(CompetenceProfile, '6042332978fd99560ccf6f25', 'rejected')
        expect(result).toBeDefined()
    })
})


/**
 * CONTROLLER
 */

 describe('get all competences', () => {
    it('should fetch all competence profiles', async () => {
        let result = competenceController.getAllCompetences()
        expect(result).toBeDefined()
    })
 })

 describe('change competence profile status', () => {
     it ('should fail with no input', async () => {
        try {
            competenceController.changeApplicationStatus()
        }
        catch(error) {
            expect(error).toBeDefined()
        }
     })
     it ('should fail with invalid input', async () => {
        try {
            let request = {invalid: true}
            competenceController.changeApplicationStatus(request)
        }
        catch(error) {
            expect(error).toBeDefined()
        }
     })
    //  it ('should succeed with valid input', async () => {
    //     let request = {
    //         id:"6042332978fd99560ccf6f25",
    //         status:"rejected"
    //     }
    //     console.log(request)
    //     let result = await competenceController.changeApplicationStatus({
    //         id:"6042332978fd99560ccf6f25",
    //         status:"rejected"
    //     })
    //  })
 })

afterAll(() => {
    mongoose.connection.close()
})