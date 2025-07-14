const voteController = require("../controller/vote");
const verifyToken = require("../middleware/verifyToken");
const express = require("express");

const router = express.Router();
router.get("/all", voteController.getVoteController);
router.get("/product", voteController.getVoteByProductController);
router.get("/all-reply", voteController.getVoteReplyByProductController);

router.use(verifyToken);
router.post("/create", voteController.createVoteController);
router.post("/create-reply", voteController.createVoteReplyController);

module.exports = router;
