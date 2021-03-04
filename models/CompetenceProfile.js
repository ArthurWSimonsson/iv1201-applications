const mongoose = require('mongoose');

const competenceProfileSchema = new mongoose.Schema(
    {
        person: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        competence: {
            type: mongoose.ObjectId,
            ref:'Competence',
            required: true
        },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ApplicationStatus',
            required: true
        },
        years_of_experience: {
            type: Number,
            required: true
        } 
    }
)

const CompetenceProfile = mongoose.model("CompetenceProfile", competenceProfileSchema)
module.exports = CompetenceProfile




// CREATE TABLE competence_profile (
//     competence_profile_id BIGINT PRIMARY KEY,
//     person_id BIGINT REFERENCES person,
//     competence_id BIGINT REFERENCES competence,
//     years_of_experience NUMERIC(4,2)
// );