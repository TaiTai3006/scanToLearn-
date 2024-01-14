import { combineReducers } from 'redux';
import { createStore } from 'redux';
// Import your reducers here

const rootReducer = combineReducers({
  // Combine all your reducers here
 
  // Add more reducers as needed
});

export const store = createStore(rootReducer);