const router = require("express").Router();
const userGameHistory = require("../controllers/history.controller");

router.get("/history", userGameHistory.getAllHistory);
router.post("/history", userGameHistory.addHistory);
router.get("/history/:id", userGameHistory.getHistoryById);
router.put("/history/:id", userGameHistory.updateHistory);
router.delete("/history/:id", userGameHistory.deleteHistory);

module.exports = router;
