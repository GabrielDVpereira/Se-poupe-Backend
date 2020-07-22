import Users from "../models/User";
import { User } from '../interfaces/user';
import bcrypt from "bcrypt";
import _ from "lodash";
import { Response, Request } from 'express';

class AuthController {
  constructor() {}
  async auth(req: Request, res: Response) {
    const { email, password } = <any>req.body;

    try {
      let user:User = await Users.findOne({ email });
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
