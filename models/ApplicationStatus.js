const mongoose = require('mongoose');

const applicationStatus = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    }
)

const ApplicationStatus = mongoose.model("ApplicationStatus", applicationStatus)
module.exports = ApplicationStatus