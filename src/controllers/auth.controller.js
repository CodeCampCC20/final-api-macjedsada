import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (user) {
      createError(400, "Username already");
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    console.log(hashPassword);

    const result = await prisma.user.create({
      data: {
        username: username,
        password: hashPassword,
      },
    });
    res.json({ message: `Register ${result.username} Success` });
  } catch (error) {
    next(error);
  }
};

export const registerDoctor = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password, specialization } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (doctor) {
      createError(400, "Username already");
    }
    const hashPassword = bcrypt.hashSync(password, 8);
    console.log(hashPassword);

    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: hashPassword,
        specialization: specialization,
      },
    });
    res.json({ message: `Register ${result.username} Success` });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log(user);
    if (!user) {
      createError(400, "Username or Password is invalid!!");

      const checkPassword = bcrypt.compareSync(password, user.password);

      if (!checkPassword) {
        createError(400, "Username or Password is invalid!!");
      }
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.json({
      message: `Welcome back ${user.username}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    console.log(doctor);
    if (!doctor) {
      createError(400, "Username or Password is invalid!!");

      const checkPassword = bcrypt.compareSync(password, doctor.password);

      if (!checkPassword) {
        createError(400, "Username or Password is invalid!!");
      }
    }
    const payload = {
      id: doctor.id,
      role: doctor.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.json({
      message: `Welcome back ${doctor.username}`,
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
