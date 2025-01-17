import jwt from "jsonwebtoken";
import { UserType } from "../types/user.type";
import { configDotenv } from "dotenv";

configDotenv();

export const generateAccessToken = (user: UserType) => {
  try {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
    console.log(user, accessTokenSecret);
    const payload = {
      email: user.email,
      id: user.id,
      profile_picture: user.profilePicture,
    };
    const token = jwt.sign(payload, accessTokenSecret, { expiresIn: "1d" });
    console.log(token);
    return token;
  } catch (error) {
    return;
  }
};
