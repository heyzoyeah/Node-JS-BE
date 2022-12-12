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
  //   console.log(dataUsers);

  return res.status(200).json({
    messenger: dataUsers.errmess,
    errCode: dataUsers.errCode,
    // nếu có data users thì sẽ trả ra data user còn không thì sẽ trả ra Ob rỗng
    user: dataUsers.userLogin ? dataUsers.userLogin : {},
  });
};
//handleGetAllUser
let handleGetAllUser = async (req, res) => {
  let id = req.query.id;
  //validate from server
  if (!id) {
    return res.status(200).json({
      messenger: "missing user",
      errCode: 1,
    });
  }
  if (id) {
    let users = await userService.handleGetAll(id);
    return res.status(200).json({
      messenger: "found users",
      errCode: 0,
      users,
    });
  }
};
//handleCreateUser
let handleCreateUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);

  console.log(message);
  return res.status(200).json({ message });
};

//handleDeleteUser
let handleDeleteUser = async (req, res) => {
  let id = req.body.id;

  if (!id) {
    return res.status(200).json({
      errcode: 3,
      message: "not found user",
    });
  }

  if (id) {
    let message = await userService.handleDeleteUser(id);
    return res.status(200).json({ message });
  }
};
//handleUpdateUser
let handleUpdateUser = async (req, res) => {
  let data = req.body;
  console.log(data);
  if (!data) {
    return res.status(200).json({
      errcode: 3,
      message: "not found user",
    });
  }
  if (data) {
    let message = await userService.handleUpdateUser(data);
    return res.status(200).json({ message });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateUser: handleCreateUser,
  handleDeleteUser: handleDeleteUser,
  handleUpdateUser: handleUpdateUser,
};
