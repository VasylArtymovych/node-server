const express = require("express");
const ctrl = require("../controllers");
const { hlps } = require("../helpers");
const { validation } = require("../middlewares");
const { userSchema, loginSchema } = require("../schema");

const router = express.Router();

router.post("/users", validation(userSchema), hlps.ctrlWrapper(ctrl.addUser));

router.post("/login", validation(loginSchema), hlps.ctrlWrapper(ctrl.login));

router.get("/users/:id", hlps.ctrlWrapper(ctrl.getUser));

router.put(
  "/users/:id",
  validation(userSchema),
  hlps.ctrlWrapper(ctrl.updateUser)
);

module.exports = router;
