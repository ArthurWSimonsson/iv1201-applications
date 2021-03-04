const ApplicationStatus = require('../models/ApplicationStatus')
const {addNewStatus} = require('../integration/competenceDAO')

module.exports = async () => {
    await addNewStatus(ApplicationStatus, 'accepted')
    await addNewStatus(ApplicationStatus, 'rejected')
    await addNewStatus(ApplicationStatus, 'unhandled')
}

