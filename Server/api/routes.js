const router = require("express").Router();
const { adminAuth } = require("../middleware/adminAuth");

const userController = require("../controllers/userController");

const createRouter = (pool) => {
  // Authentication URLS
  router.post("/auth/login", (req, res) => userController.loginUser(req, res, pool));
  router.post("/auth/logout", adminAuth, (req, res) => userController.logoutUser(req, res, pool));
  router.post("/auth/signup", (req, res) => userController.signupUser(req, res, pool));
  router.post("/notification", (req, res) => userController.expoNotifications(req, res, pool));

  return router;
};

module.exports = createRouter;
