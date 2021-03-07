const mongoose = require("mongoose");
const User = require('../models/User')
const Competence = require('../models/Competence')
const ApplicationStatus = require('../models/ApplicationStatus')

/**
 * Private function for adding new competence profiles.
 * @param {*} mongoDatabase Mongo schema object
 * @param {*} personId PersonID to be added
 * @param {*} competenceId CompetenceID to be added
 * @param {*} status StatusID to be added
 * @param {*} years Amount of years
 */
exports.addNewCompetenceProfile = async (mongoDatabase, personId, competenceId, status, years) => {
    return await new mongoDatabase(
        {
            person: personId,
            competence: competenceId,
            status: status,
            years_of_experience: years
        }
    ).save()
}
/**
 * Private function for adding new statuses.
 * @param {*} mongoDatabase Mongo schema object
 * @param {*} name Name of status
 */
exports.addNewStatus = async(mongoDatabase, name) => {
    return await new mongoDatabase(
        {
            name: name
        }
    ).save()
}

/**
 * Private function for adding new competences.
 * @param {*} mongoDatabase Mongo schema object
 * @param {*} name Name of competence
 */
exports.addNewCompetence = async(mongoDatabase, name) => {
    return await new mongoDatabase(
        {
            name: name
        }
    ).save()
}

/**
 * Get all entries of competence profiles, populates with data from other collections.
 * @param {*} mongoDatabase Mongo schema object
 */
exports.getAllEntries = async(mongoDatabase) => {

    let profiles = await mongoDatabase
        .find({})
        .populate('status', 'name')
        .populate('competence', 'name')
        .populate('person')
        .exec()

    // console.log(profiles)

    return profiles
}

/**
 * Gets status id based on query name
 * @param {object} mongoDatabase Mongo schema object
 * @param {String} name Name of status
 */
exports.getStatusIdbyName = async(mongoDatabase, name) => {
    let status = await mongoDatabase.findOne({name})
    return status._id
}

/**
 * Change status of a competence profile.
 * @param {} mongoDatabase Mongo schema object
 * @param {*} competenceProfileId Id of competence profile
 * @param {*} status New status of competence profile
 */
exports.changeStatus = async(mongoDatabase, competenceProfileId, status) => {
    console.log('competenceDAO.changeStatus triggered')
    let id = await this.getStatusIdbyName(ApplicationStatus, status)
    return await mongoDatabase.findOneAndUpdate({_id : competenceProfileId}, {status: id}, {new: true})
}

