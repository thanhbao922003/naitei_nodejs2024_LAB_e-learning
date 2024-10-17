﻿import { Router } from "express";
import i18nextMiddleware from "i18next-http-middleware";
import i18next from "../i18n";
import setLocaleMiddleware from "../middleware/setLocaleMiddleware";
import courseRoute from "./course.routes"
import homeRoute from "./home.routes"
import enrollmentRoute from "./enrollment.routes"


const router = Router();

router.use(i18nextMiddleware.handle(i18next));
router.use(setLocaleMiddleware);

router.use('/', homeRoute);

router.use('/courses',courseRoute);
router.use('/enrollments',enrollmentRoute);


export default router;
