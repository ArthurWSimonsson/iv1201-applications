const mongoose = require('mongoose');

const competence = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }
)

const Competence = mongoose.model("Competence", competence)
module.exports = Competence