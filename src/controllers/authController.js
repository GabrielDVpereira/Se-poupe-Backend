const User = require("../models/User");
const bcrypt = require("bcrypt");
const _ = require("lodash");

class AuthController {
  constructor() {}
  async auth(req, res) {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) throw "Invalid email or password provided";

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = user.generateAuthToken();
        return res
          .header("x-auth-token", token)
          .json(_.pick(user, ["name", "_id", "birthdate", "income"]));
      } else {
        throw "Invalid email or password provided";
      }
    } catch (error) {
      console.log(error);

      return res.status(400).json({ error: error.message || error });
    }
  }
  current(res, req) {
    const { _id } = req.user;

    try {
      const user = User.findById(_id).select("-password"); //excluding the password from the request
      if (!user) throw "no user found";
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}
module.exports = new AuthController();
