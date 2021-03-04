const Competence = require('../models/Competence')
const {addNewCompetence} = require('../integration/competenceDAO')

module.exports = async () => {
    await addNewCompetence(Competence, 'korvgrillning')
    await addNewCompetence(Competence, 'karuselldrift')
}

