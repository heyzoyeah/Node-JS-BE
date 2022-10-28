import userService from "../service/userService";

let handleLogin = async (req, res) => {
  //check validate user
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      messenger: "nhập không đủ",
    });
  }
  let dataUsers = await userService.handleLogin(email, password);
  console.log(dataUsers);

  return res.status(200).json({
    messenger: dataUsers.errmess,
    rrerCode: dataUsers.errCode,
    // nếu có data users thì sẽ trả ra data user còn không thì sẽ trả ra Ob rỗng
    user: dataUsers.userLogin ? dataUsers.userLogin : {},
  });
};

module.exports = {
  handleLogin: handleLogin,
};
