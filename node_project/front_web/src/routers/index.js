import SMERouter from "sme-router";
import { login, homePage } from "../controllers/sign.js";
const routers = new SMERouter("app");

// 首页
routers.route("/", login(routers));

routers.route("/index", homePage(routers));
// 登录
routers.route("/signin", login(routers));

export default routers;
