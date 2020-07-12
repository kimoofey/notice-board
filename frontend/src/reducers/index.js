import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import CategoriesReducer from './categoriesReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    Categories: CategoriesReducer,
    auth: authReducer,
    errors: errorReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
