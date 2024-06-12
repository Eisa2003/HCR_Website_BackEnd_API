const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config(); // imports the module where 
                                           // it loads env variables from a `.env` file into process.env
                                           // the env vars are accessible to all processes
connectDb();
const app = express();                                  

// All the middlewares
app.use(express.json()); // Useful for parsing data from HTTP `requests`
app.use("/api/events", require("./routes/eventRoutes")); // Any requests to "/api/contacts"
                                                       // will be handled by the routes defined in the mentioned file
app.use(errorHandler); // Have switch statements with status codes in it

const port = process.env.PORT || 5000;

// All of the above initialization is necessary before the server starts to listen
// so that the code executes and responds how we will it to
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

