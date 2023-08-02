import indexTp from "../views/index.art";
import loginTp from "../views/login.art";

const indexHtml = indexTp({});
const loginHtml = loginTp({});

const _handleLogin = (router) => {
  return () => {
    router.go("/index");
  };
};

const login = (routers) => {
  return (req, res, next) => {
    res.render(loginHtml);
    document
      .querySelector("#signin")
      .addEventListener("click", _handleLogin(routers));
  };
};

const homePage = (routers) => {
  return (req, res, next) => {
    res.render(indexHtml);
  };
};

export { login, homePage };
