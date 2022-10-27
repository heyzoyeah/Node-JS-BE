import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"

// require thư viện dotenv
require('dotenv').config();

//lib express
let app = express();

// config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


viewEngine(app);
initWebRoutes(app);
connectDB();


// lấy port trong .env
let port = process.env.PORT || 6969;
//port === undefined => port = 6969



app.listen(port, () =>{
    //callback
    console.log(" backend nodejs runnig on the port:" + port)
})