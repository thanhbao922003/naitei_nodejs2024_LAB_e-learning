import express from "express";
import { getHomePage } from "../controller/home.controller";

const router = express.Router();

router.get("/", getHomePage);

export default router;
