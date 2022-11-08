import { json } from "body-parser";
import db from "../models/index";
import CRUDservice from "../service/CRUDservice";

//render file views to homepage
// kết nối vs db thường phải dùng methos là async,await
let getHomeController = async (req, res) => {
  return res.render("homepage.ejs");
};

let aboutController = (req, res) => {
  return res.render("test/about.ejs");
};

let postCRUD = async (req, res) => {
  let messenger = await CRUDservice.createNewUser(req.body);
  console.log(messenger);
  return res.send("post form sever");
};

let displayGetCRUD = async (req, res) => {
  let dataUsers = await CRUDservice.getUsers();
  // console.log(dataUsers);

  return res.render("get-crud.ejs", {
    dataTable: dataUsers, // dataTable l2 biến export to view
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id; // lấy ID
  //set điều kiện cho lấy id
  if (userId) {
    let userHome = await CRUDservice.getUserInfoById(userId);
    console.log("-------------------");
    console.log(userHome);
    console.log("-------------------");
    return res.render("edit-CRUD.ejs", {
      dataId: userHome, // dataTable l2 biến export to view
    });
  } else {
    return res.send("đéo có user ID");
  }
};

let getPutCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDservice.updateUserData(data);

  return res.render("get-crud.ejs", {
    dataTable: allUsers,
  });
};

let getDeleteCRUD = async (req, res) => {
  let id = req.query.id;

  let deleUser = await CRUDservice.deleteUserById(id);

  return res.render("get-crud.ejs", {
    dataTable: deleUser,
  });
};
//exports oj functions homeController
module.exports = {
  getHomeController: getHomeController,
  aboutController: aboutController,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  getPutCRUD: getPutCRUD,
  getDeleteCRUD: getDeleteCRUD,
};
