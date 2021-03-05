const competenceDAO = require("../integration/competenceDAO");
const CompetenceProfile = require('../models/CompetenceProfile')
const ApplicationStatus = require('../models/ApplicationStatus')


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