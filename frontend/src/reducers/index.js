import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import Categories from "./Categories";

const rootReducer = combineReducers({
    Categories
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;