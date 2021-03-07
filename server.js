const express = require('express')
const app = express()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const data = require("./data/Data");
const dbController = require("./controllers/DBController");
const compAPI = require('./routes/appAPI')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use('/', compAPI)

try {
    dbController.connectServerToDB(app);
} catch (error) {
    console.log("Could not connect to MongoDB Cloud Database");
    console.log(error);
}


/**
 * Starts server on supplied port.
 */
app.on("mongodb_connection_ready", async () => {
    await data();
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
});

exports.app = app;