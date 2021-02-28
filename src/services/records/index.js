const ADD_RECORDS = "ADD_RECORDS";
const CLEAR_RECORDS = "CLEAR_RECORDS";

export const RECORD_TYPES = {
  ADD_RECORDS,
  CLEAR_RECORDS,
};

const initialState = {
  data: [],
};

export const records = (state = initialState, action) => {
  switch (action.type) {
    case RECORD_TYPES.ADD_RECORDS:
      return {
        ...state,
        data: state.data.concat(action.payload),
      };
    case RECORD_TYPES.CLEAR_RECORDS:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};
