import { ADD_COURSE } from '../actionType';
export const addCourse = (title, images) => ({
    type: ADD_COURSE,
    payload: { title, images },
  });