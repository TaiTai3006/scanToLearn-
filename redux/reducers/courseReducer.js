// reducers/courseReducer.js
import { ADD_COURSE } from '../actionType';

const initialState = {};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state,
        title: action.payload.title,
        images: action.payload.images,
      };
    default:
      return state;
  }
};

export default courseReducer;
