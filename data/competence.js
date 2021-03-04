const CompetenceProfile = require('../models/CompetenceProfile')
const {addNewCompetenceProfile} = require('../integration/competenceDAO')

module.exports = async () => {
    await addNewCompetenceProfile(CompetenceProfile, '603d612387d9ff20d8ef2ac8', '603ffcf444c2ba38f450063e', '603fee73c34ea23bb8eaf1cf', 4)
    await addNewCompetenceProfile(CompetenceProfile, '603d612387d9ff20d8ef2ac8', '603ffcf444c2ba38f450063f', '603fee73c34ea23bb8eaf1cf', 4)
}
