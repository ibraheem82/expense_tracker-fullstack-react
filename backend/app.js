require('dotenv').config();
const express = require("express");
const cors = require("cors");


const app = express();

const PORT = process.env.PORT || 6000;
// https://api.openai.com/v1/chat/completions

// Middlewares 
app.use(cors());
app.use(express.json())

// Routes
app.use('/api/analyze', );
app.use('/api/grammercheck', grammerCheckRoute);
app.use('/api/spellcheck', spellCheckRoute);

// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });