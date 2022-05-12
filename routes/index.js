const router = require("express").Router();
const users = require("./user");
const history = require("./history");

const home = require("./home");
const userView = require("./user.view");
const historyView = require("./history.view");

const auth = require("./auth");

router.use(auth);

router.use(home);
router.use("/api/", users);
router.use("/api/", history);

router.use("/view/", userView);
router.use("/view/", historyView);

module.exports = router;
