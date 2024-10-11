import { Router } from "express";
import i18nextMiddleware from "i18next-http-middleware";
import i18next from "../i18n";
import setLocaleMiddleware from "../middleware/setLocaleMiddleware";
import { getHomePage } from "@src/controller/home.controller";

const router = Router();

router.use(i18nextMiddleware.handle(i18next));
router.use(setLocaleMiddleware);

router.use(getHomePage);

export default router;
