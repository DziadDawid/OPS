const express = require("express");
const router = express.Router();

const indexController = require('../controllers/controller');
const appController = require("../controllers/appController");
const errorHandler = require("../middlewares/errors");

router.get("/", indexController.app);

router.post("/", appController.validate, appController.checkValidation, appController.hashPass, errorHandler.catchAsync(appController.store));

module.exports = router;