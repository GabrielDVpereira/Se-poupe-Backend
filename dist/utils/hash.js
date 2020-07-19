"use strict";
const bcrypt = require("bcrypt");
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHashed = await bcrypt.hash(password, salt);
        return passwordHashed;
    }
    catch (error) {
        return error;
    }
}
module.exports = hashPassword;
