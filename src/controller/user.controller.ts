import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  userRegister,
  userLogin,
  decodeJwtToken,
} from "../service/user.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const {
    name, email, password, role, phone_number, avatar, date_of_birth,
    gender, address, identity_card, additional_info, department, years_of_experience
  } = req.body;

  try {
    const user = await userRegister(
      name, email, password, role, phone_number, avatar, date_of_birth,
      gender, address, identity_card, additional_info, department, years_of_experience
    );

    res.status(201).json({ status: 201, message: req.t("signup.signup-success"), user });
  } catch (error) {
    const message = error.message === "User already exists with this email or username"
      ? error.message
      : req.t("signup.signup-failure");
    res.status(400).json({ status: 400, message });
  }
});


export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userLogin(email, password);

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
    res.status(400).json({ status: 400, message: req.t("login.login-failure") });
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

export const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ status: 500, message: req.t("logout.failure") });
        }
        res.clearCookie("connect.sid"); 
        return res.redirect("/");
      });
    } else {
      res
        .status(400)
        .json({ status: 400, message: req.t("logout.no-session") });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: req.t("logout.failure") });
  }
});