import express from "express";
import "express-async-errors";
import router from "./route";
import path from "path";

const app = express();

const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../src/views"));

app.use(router);

export default app;
