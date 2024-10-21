import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  userRegister,
  userLogin,
  decodeJwtToken,
} from "../service/user.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userRegister(name, email, password, "user");
    res
      .status(201)
      .json({ status: 201, message: req.t("signup.signup-success"), user });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: req.t("signup.signup-failure") });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userLogin(email, password);
    console.log(user);

    if (req.session) {
      req.session.accessToken = token;
      req.session.user = user;
    }

    res.status(200).json({
      status: 200,
      message: req.t("login.login-success"),
      token,
      user,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, message: req.t("login.login-failure") });
  }
});

export const verifyUser = asyncHandler((req: Request, res: Response) => {
  const token = req.body.token;
  const user = decodeJwtToken(token);
  if (user != null) {
    res.status(200).json({
      status: 200,
      message: req.t("login.authentication"),
      user: user,
    });
  } else
    res
      .status(401)
      .json({ status: 401, message: req.t("login.not-authentication") });
});
