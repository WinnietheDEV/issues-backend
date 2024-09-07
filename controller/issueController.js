const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const { issues } = require("../data/issue");

const getAllIssues = async (req, res) => {
  res.status(StatusCodes.OK).json({ issue: issues });
};

const getIssue = (req, res) => {
  const { id } = req.params;
  const issue = issues.findIndex((issue) => issue.id === id);

  return res.status(StatusCodes.OK).json({
    message: "Successfully found the issue",
    issue: issue,
  });
};

const postIssue = async (req, res) => {
  const latestId = issues[issues.length - 1].id;

  issues.push({ ...req.body, id: latestId + 1 });
  return res.status(StatusCodes.OK).json({
    message: "Successfully created the issue",
    issue: req.body,
  });
};

const deleteIssue = async (req, res) => {
  const { id } = req.params;
  const issueIndex = issues.findIndex((issue) => issue.id == id);

  if (issueIndex === -1) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Issue not found" });
  }

  const [deletedIssue] = issues.splice(issueIndex, 1);

  return res.status(StatusCodes.OK).json({
    message: "Successfully deleted the issue",
    issue: deletedIssue,
  });
};

module.exports = {
  getAllIssues,
  postIssue,
  getIssue,
  deleteIssue,
};
