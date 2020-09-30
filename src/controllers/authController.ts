import User from "../models/User";
import bcrypt from "bcrypt";
import _ from "lodash";
import { Response, Request } from "express";
import { IUser } from "../models/User";

interface UserAuthInfo {
  email: IUser["email"];
  password: IUser["password"];
}

class AuthController {
  constructor() {}
  async auth(req: Request, res: Response) {
    const { email, password } = <UserAuthInfo>req.body;

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
}
export default new AuthController();
