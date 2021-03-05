const mongoose = require("mongoose");
const User = require('../models/User')
const Competence = require('../models/Competence')
const ApplicationStatus = require('../models/ApplicationStatus')


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

exports.addNewStatus = async(mongoDatabase, name) => {
    return await new mongoDatabase(
        {
            name: name
        }
    ).save()
}

exports.addNewCompetence = async(mongoDatabase, name) => {
    return await new mongoDatabase(
        {
            name: name
        }
    ).save()
}

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

exports.getStatusIdbyName = async(mongoDatabase, name) => {
    let status = await mongoDatabase.findOne({name})
    return status._id
}

exports.changeStatus = async(mongoDatabase, competenceProfileId, status) => {
    console.log('competenceDAO.changeStatus triggered')
    let id = await this.getStatusIdbyName(ApplicationStatus, status)
    return await mongoDatabase.findOneAndUpdate({_id : competenceProfileId}, {status: id}, {new: true})
}

