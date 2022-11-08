import db from "../models/index";
import bcrypt from "bcryptjs";

let handleLogin = (email, password) => {
  return new Promise(async (resole, reject) => {
    try {
      let userData = {}; // trả data lại cho người dùng
      let emailExist = await CheckUserEmail(email); //check mail

      // nếu có emailExist thì
      if (emailExist) {
        // check lại email nếu cùng lúc đó ai xoá bản ghi thì sẽ k lỗi
        let userLogin = await db.User.findOne({
          attributes: ["id", "email", "password"], // define columns that you want to show
          where: { email: email },
          raw: true,
        });

        if (userLogin) {
          //compare password
          let checkpassword = await bcrypt.compareSync(
            password,
            userLogin.password
          );
          if (checkpassword) {
            userData.errCode = 0;
            userData.errmess = "password okay";
            delete userLogin.password; //delete password to view
            userData.userLogin = userLogin;
          } else {
            userData.errCode = 3;
            userData.errmess = "password worng";
          }
        } else {
          userData.errCode = 2;
          userData.errmess = "email không tồn tại";
        }
      } else {
        userData.errCode = 1;
        userData.errmess = "email không tồn tại";
      }
      // errCode, errmess
      resole(userData);
    } catch (e) {
      reject(e);
    }
  });
};

//check Email
let CheckUserEmail = (checkmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      // tìm bản 1 bản ghi. Emal
      let userLogin = await db.User.findOne({
        where: { email: checkmail },
      });
      // nếu có userLogin thì
      if (userLogin) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleGetAll = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      // get all user
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"], // define columns that you don't want
          },
        });
      }
      // get one user
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"], // define columns that you don't want
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAll: handleGetAll,
};
