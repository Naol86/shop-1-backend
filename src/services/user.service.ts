import bcrypt from "bcrypt";
import prisma from "../config/prisma";

export const createUser = async (user: any): Promise<any> => {
  try {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await prisma.user.create({
      ...user,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    // Handle error
    console.log("error creating user in service", error);
    return;
  }
};

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    console.log("error getting user by email in service", error);
    return;
  }
};
