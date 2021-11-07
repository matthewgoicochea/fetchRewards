const router = require("express").Router();
const controller = require("./points.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
