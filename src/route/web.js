import express from "express";
// import vào file controller
import homeController from "../controllers/homeController";
import usersController from "../controllers/usersController";
let router = express.Router();

let initWebRoutes = (app) => {
  //chuẩn test aPI
  //URL get vào file controller lấy các hàm
  router.get("/", homeController.getHomeController);
  router.get("/about", homeController.aboutController);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.getPutCRUD);
  router.get("/delete-crud", homeController.getDeleteCRUD);

  router.post("/api/login", usersController.handleLogin);

  // router.get('/index', (req, res) => {
  //     return res.send('helo index')
  // });

  return app.use("/", router);
};

module.exports = initWebRoutes;
