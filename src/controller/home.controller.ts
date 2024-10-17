import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getCoursesWithSectionsAndHours } from "../service/course.service";

export const renderHomePage = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const courses = await getCoursesWithSectionsAndHours();
      res.render("index", {
        title: { message: req.t("home.title") },
        message: { message: req.t("home.message") },
        courses,
        t: req.t,
      });
    } catch (error) {
      res
        .status(500)
        .render("error", { message: req.t("course.course_error") });
    }
  }
);
