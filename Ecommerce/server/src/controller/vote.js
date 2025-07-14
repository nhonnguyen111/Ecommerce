const voteServices = require("../services/vote");
const createVoteController = async (req, res) => {
  try {
    const { id } = req.customer;
    const { vote_content, vote_image, vote_rate, product_id, order_id } =
      req.body;
    const response = await voteServices.createVoteServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getVoteController = async (req, res) => {
  try {
    const response = await voteServices.getVoteServices();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getVoteByProductController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await voteServices.getVoteByProductServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const createVoteReplyController = async (req, res) => {
  try {
    const { vote_id, customer_id, shop_id, votereply_content } = req.body;
    const response = await voteServices.createVoteReply(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getVoteReplyByProductController = async (req, res) => {
  try {
    const { id } = req.query;
    const response = await voteServices.getVoteReplyByProductServices(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  createVoteController,
  getVoteController,
  getVoteByProductController,
  createVoteReplyController,
  getVoteReplyByProductController,
};
