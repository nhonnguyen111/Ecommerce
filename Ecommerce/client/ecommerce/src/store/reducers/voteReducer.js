import { actionType } from "../actions/actionType/actionType";

const initState = {
  vote: [],
  votereply: [],
  msg: "",
};
const voteReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.CREATE_VOTE:
    case actionType.GET_VOTE:
    case actionType.GET_VOTE_PRODUCT:
    case actionType.CREATE_VOTE_REPLY:
      return {
        ...state,
        vote: Array.isArray(action.vote) ? action.vote : [],
        msg: action.msg || "",
      };
    case actionType.GET_VOTE_REPLY:
      return {
        ...state,
        votereply: {
          ...state.votereply,
          [action.vote_id]: Array.isArray(action.votereply)
            ? action.votereply
            : [],
        },
        msg: action.msg || "",
      };

    default:
      return state;
  }
};

export default voteReducer;
