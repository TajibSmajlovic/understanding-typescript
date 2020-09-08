import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { todosReducer as todos } from 'redux/reducers';

const rootReducer = combineReducers({
  todos,
});

export const configureStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
