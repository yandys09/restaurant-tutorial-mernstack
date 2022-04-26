import { CLEAR_MESSAGES } from "../constants/messageContants";

export const clearMessages = () => dispatch => {
dispatch({
  type: CLEAR_MESSAGES,
})
}

