const express = require("express");
const {
  postIssue,
  getAllIssues,
  getIssue,
  deleteIssue,
} = require("../controller/issueController");
const router = express.Router();

router.route("/").post(postIssue).get(getAllIssues);

router.route("/:id").get(getIssue).delete(deleteIssue);

module.exports = router;
