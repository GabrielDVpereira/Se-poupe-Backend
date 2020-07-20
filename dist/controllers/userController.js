"use strict";
const User = require("../models/User");
const hashPassword = require("../utils/hash");
const _ = require("lodash");
const moment = require("moment");
class UserController {
    async create(req, res) {
        const { email, name, password, birthdate, income } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user)
                throw "This email is alredy being used";
            const hashedPassword = await hashPassword(password);
            user = await User.create({
                email,
                name,
                password: hashedPassword,
                birthdate: moment(birthdate).format("YYYY-MM-DD[T00:00:00.000Z]"),
                income,
            });
            const token = user.generateAuthToken();
            res
                .header("x-auth-token", token)
                .json(_.pick(user, ["name", "_id", "birthdate", "income"]));
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
    async current(req, res) {
        try {
            const { _id } = req.user;
            const user = await User.findById(_id).select("-password"); //excluding the password from the request
            if (!user)
                throw "no user found";
            return res.json(user);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}
module.exports = new UserController();
