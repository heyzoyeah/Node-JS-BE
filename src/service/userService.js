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
          where: { email: email },
        });

        if (userLogin) {
          //so sánh password
          let check = await bcrypt.compareSync(password, userLogin.password);
          if (check) {
            userData.errCode = 2;
            userData.errmess = "password okay";
            userData.userLogin = userLogin;
          } else {
            userData.errCode = 3;
            userData.errmess = "password worng";
          }
        } else {
          userData.errCode = 2;
          userData.errmess = "email này k tồn tại";
        }
      } else {
        //nếu k có thì trả ra
        userData.errCode = 1;
        userData.errmess = "email này k tồn tại";
      }
      // trả errCode, errmess code
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

module.exports = {
  handleLogin: handleLogin,
};
