// tạo người user
import bcrypt from "bcryptjs";
import db from "../models/index";

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

// create user into DB and hash password
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("created new user susscess");
    } catch (e) {
      reject(e);
    }
  });
};

//get users to view
let getUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      //Lấy tất cả dự liệu của users methos: findAll
      let users = await db.User.findAll({
        raw: true, // hàm lấy chỉ lấy đúng dữ liệu cần lấy
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

//get ID user
let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

//update lên DB
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // lấy ID từ body để biết user nào
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      // nếu có user thì truyền vào oject vào db
      if (user) {
        (user.email = data.email),
          (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.phonenumber = data.phonenumber);
        await user.save();
        // render cập nhập lại user
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // lấy ID từ body để biết user nào
      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (user) {
        //destroy dữ liệu
        await user.destroy();

        // render cập nhập lại user
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getUsers: getUsers,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
