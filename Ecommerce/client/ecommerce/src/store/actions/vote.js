import {
  apiCreateVote,
  apiCreateVoteReply,
  apiGetVote,
  apigetVoteByProduct,
  apiGetVoteReply,
} from "../../services/vote";
import { actionType } from "./actionType/actionType";

export const createVote = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateVote(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_VOTE,
        vote: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_VOTE,
        data: response.data.msg,
        vote: [],
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.CREATE_VOTE,
      vote: [],
    });
    return { err: 1, msg: "Lỗi hệ thống!" };
  }
};
export const getVote = () => async (dispatch) => {
  try {
    const response = await apiGetVote();
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_VOTE,
        vote: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_VOTE,
        data: response.data.msg,
        vote: [],
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.GET_VOTE,
      vote: [],
    });
    return { err: 1, msg: "Lỗi hệ thống!" };
  }
};
export const getVoteProduct = (payload) => async (dispatch) => {
  try {
    const response = await apigetVoteByProduct(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_VOTE_PRODUCT,
        vote: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_VOTE_PRODUCT,
        data: response.data.msg,
        vote: [],
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.GET_VOTE_PRODUCT,
      vote: [],
    });
    return { err: 1, msg: "Lỗi hệ thống!" };
  }
};
export const createVoteReply = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateVoteReply(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.CREATE_VOTE_REPLY,
        vote: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.CREATE_VOTE_REPLY,
        data: response.data.msg,
        vote: [],
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.CREATE_VOTE_REPLY,
      vote: [],
    });
    return { err: 1, msg: "Lỗi hệ thống!" };
  }
};
export const getVoteReply = (vote_id) => async (dispatch) => {
  try {
    const response = await apiGetVoteReply({ id: vote_id });
    if (response?.data.err === 0) {
      dispatch({
        type: actionType.GET_VOTE_REPLY,
        vote_id,
        votereply: response.data.response,
      });
    } else {
      dispatch({
        type: actionType.GET_VOTE_REPLY,
        vote_id,
        votereply: [],
      });
    }
    return response.data;
  } catch (error) {
    dispatch({
      type: actionType.GET_VOTE_REPLY,
      vote_id,
      votereply: [],
    });
    return { err: 1, msg: "Lỗi hệ thống!" };
  }
};
