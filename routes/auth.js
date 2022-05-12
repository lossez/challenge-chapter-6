const router = require("express").Router();
const { login, loginPost } = require("../controllers/auth.controller");

router.get("/login", login);
router.post("/loginPost", loginPost);
module.exports = router;
