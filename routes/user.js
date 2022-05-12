const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/usergame", userController.getAllUser);
router.get("/usergame/:id", userController.getUserById);
router.post("/usergame", userController.createUser);
router.put("/usergame/:id", userController.updateUser);
router.delete("/usergame/:id", userController.deleteUser);

module.exports = router;
