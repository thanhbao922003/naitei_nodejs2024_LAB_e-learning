import { Router } from "express";
import * as userController from "../controller/user.controller";

const router: Router = Router();

// Render the signup form
router.get("/signup", (req, res) => {
  res.render("signup", { title: req.t("home.signup"), pageUrl: "/signup" });
});

router.post("/register", userController.register);

// Render the login form
router.get("/login", (req, res) => {
  res.render("login", { title: req.t("home.login"), pageUrl: "/login" });
});

router.post("/login", userController.login);
router.post("/verify", userController.verifyUser);

export default router;
