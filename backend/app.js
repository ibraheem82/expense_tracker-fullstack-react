require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/userRouter');
const errHandler = require('./middlewares/errHandlerMiddleware');
// const cors = require("cors");


const app = express();
mongoose
    .connect("mongodb://localhost:27017/expensetrackerapplication")
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));


    // Middlewares 
    app.use(express.json())
const PORT = process.env.PORT || 6000;

// app.use(cors());

// Routes
app.use('/', userRouter);
// app.use('/api/grammercheck', grammerCheckRoute);
// app.use('/api/spellcheck', spellCheckRoute);


// Err handler
app.use(errHandler);
// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.....`);
    });