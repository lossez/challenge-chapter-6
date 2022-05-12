const router = require("express").Router();
const historyView = require("../controllers/history.view.controller");

router.get("/history", historyView.index);
router.get("/history/new", historyView.new);
router.get("/history/:id", historyView.show);
router.get("/history/:id/edit", historyView.edit);

module.exports = router;
