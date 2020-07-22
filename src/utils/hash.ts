import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    return passwordHashed;
  } catch (error) {
    return error;
  }
}

export default hashPassword;
