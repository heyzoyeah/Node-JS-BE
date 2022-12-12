import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

// hash password
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasword = await bcrypt.hashSync(password, salt);
      resolve(hashPasword);
    } catch (e) {
      reject(e);
    }
  });
};

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

let checkDataUser = (checkUser) => {
  if (
    checkUser.email === null ||
    checkUser.email === "" ||
    checkUser.password === null ||
    checkUser.password === ""
  ) {
    return true;
  } else {
    return false;
  }
};
// create user into DB and hash password
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email
      let check = await CheckUserEmail(data.email);
      let checkDATA = checkDataUser(data);

      if (checkDATA === true) {
        resolve({
          errCode: 2,
          errMessage: "nhập k đủ ",
        });
      }

      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email đã tồn tại",
        });
      } else {
        let hashPaswordFromBcryt = await hashUserPassword(data.password);

        let creatUser = await db.User.create({
          email: data.email,
          password: hashPaswordFromBcryt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          errMessage: "tạo thành công",

          creatUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//handleDeleteUser
let handleDeleteUser = async (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: idUser },
      });

      if (!foundUser) {
        resolve({
          errCode: 4,
          message: "user id not exist",
        });
      }

      await foundUser.destroy();

      resolve({
        errCode: 0,
        message: "Delete user done",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let handleUpdateUser = (idUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: idUser.id },
      });

      if (!foundUser) {
        resolve({
          errCode: 4,
          message: "user id not exist",
        });
      }

      if (foundUser) {
        (foundUser.email = idUser.email),
          (foundUser.firstName = idUser.firstName),
          (foundUser.lastName = idUser.lastName),
          (foundUser.address = idUser.address),
          (foundUser.phonenumber = idUser.phonenumber);
        await foundUser.save();
        resolve({
          errCode: 0,
          message: "Edit user done",
          foundUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAll: handleGetAll,
  createNewUser: createNewUser,
  handleDeleteUser: handleDeleteUser,
  handleUpdateUser: handleUpdateUser,
};
