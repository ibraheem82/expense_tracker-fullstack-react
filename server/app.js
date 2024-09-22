const express = require("express");
const cors = require("cors");
require('dotenv')

const app = express();

const PORT = process.env.PORT || 6000;

// Middlewares 
app.use(cors());
app.use(express.json())


// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });