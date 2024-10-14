import { Request, Response } from "express";

export const getHomePage = (req: Request, res: Response) => {
  res.render("index", {
    title: "LAB",
    message: "Welcome to LAB",
    t: req.t,
  });
};
