const competenceDAO = require("../integration/competenceDAO");
const CompetenceProfile = require('../models/CompetenceProfile')
const ApplicationStatus = require('../models/ApplicationStatus')

/**
 * Gets all competence profile
 * 
 * @returns profiles
 * 
 * @throws 400 if no profiles were found
 */
exports.getAllCompetences = async () => {
    console.log('competenceController.getAllCompetences triggered')
    const profiles = await competenceDAO.getAllEntries(CompetenceProfile)
    // console.log(profiles)

    if (!profiles)
        throw {
            isError: true,
            msgBody: 'error.noProfiles', // no profiles found in DB
            code: 400
        }

    return {
        isError: false,
        msgBody: 'profiles.found', // profiles to show in DB
        code: 200,
        profiles: profiles
    }
}

/**
 * Changes status of competence profile
 * 
 * @param {Object} request body of request
 *  
 * @returns success message
 * 
 * @throws 400 with a bad request
 */
exports.changeApplicationStatus = async (request) => {
    console.log('competenceController.changeApplicationStatus triggered')

    let result = await competenceDAO.changeStatus(CompetenceProfile, request.id, request.status)

    if (!result)
        throw {
            isError: true,
            msgBody: 'error.unsuccessful',
            code: 400
        }

    return {
        isError: false,
        msgBody: 'status.changed', 
        code: 200
    }
}