require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/userRouter');
const errHandler = require('./middlewares/errHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const cors = require("cors");


const app = express();
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
// ! Cors config

const corsOptions = {
    origin: ["https://5173-ibraheem82-fullstackexp-c2iib4cfprr.ws-eu116.gitpod.io/"]
}



app.use(cors(corsOptions));
    // Middlewares 
app.use(express.json())
const PORT = process.env.PORT || 6000;


// Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);


// Err handler
app.use(errHandler);
// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.....`);
    });