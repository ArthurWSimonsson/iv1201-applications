const competence = require("./competence");
const status = require("./status");
const comp = require("./comp")
const CompetenceProfile = require('../models/CompetenceProfile')

/**
 * Initializes all data.
 */
module.exports = async () => {
    try {
        await competence();
        // await status()
        // await comp()

    }
    catch(e) {
        console.log("Competence Error (Duplicate) (Good)");
        console.log(e)
    }
}