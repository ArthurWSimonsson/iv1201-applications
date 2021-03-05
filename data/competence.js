const CompetenceProfile = require('../models/CompetenceProfile')
const {addNewCompetenceProfile} = require('../integration/competenceDAO')

module.exports = async () => {
    await addNewCompetenceProfile(CompetenceProfile, '60423212483f6506788db8eb', '603ffcf444c2ba38f450063e', '603fee73c34ea23bb8eaf1cf', 4)
    await addNewCompetenceProfile(CompetenceProfile, '604232d2483f6506788db8ec', '603ffcf444c2ba38f450063f', '603fee73c34ea23bb8eaf1cf', 4)
}



