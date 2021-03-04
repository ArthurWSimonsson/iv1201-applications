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
    // let test = await User.find({})
    // let test1 = await Competence.find({})
    // let test2 = await ApplicationStatus.find({})

    console.log(profiles)

    // for (let i = 0; i < profiles.length; i++) {
    //     // entry.person = User.findById(person)
    //     profiles[i].person = await User.findById(profiles[i].person)
    //     // console.log(profiles[i].competence)
    //     let competence = await Competence.findById(profiles[i].competence)
    //     console.log('test' + competence)
    //     profiles[i].competence = competence.name
    //     profiles[i].status = await ApplicationStatus.findById(profiles[i].status)
    //     console.log(profiles[i])
    // }

    return profiles
}