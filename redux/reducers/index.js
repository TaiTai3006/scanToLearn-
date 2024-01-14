import { combineReducers } from 'redux';
import { createStore } from 'redux';
// Import your reducers here
// import folderReducer from '../reducers/folderReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  // Combine all your reducers here
  courses: courseReducer,
  // Add more reducers as needed
});

export const store = createStore(rootReducer);