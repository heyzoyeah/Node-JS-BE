//setup thư viện vào folder views
//import thư viện vàao
import express from "express";


let configViewEngine = (app) => {
    // sử dụng thư viện express để static app lấy hình ảnh bla bla
    app.use(express.static("./src/public"));
    // set view engine lib ejs
    app.set("view engine ", "ejs");
    //set đường dẫn vào folder views
    app.set("views","./src/views");
};

//exports function configViewEngine dùng cho app
module.exports = configViewEngine;  