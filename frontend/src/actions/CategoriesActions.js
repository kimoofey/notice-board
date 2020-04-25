import {FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS} from "../constants/ActionTypes";
import axios from 'axios';

export const fetchCategoriesRequest = () => ({
    type: FETCH_CATEGORIES_REQUEST,
    payload: {
        isLoading: true,
        isError: false
    }
});

export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: {
        categories: categories,
        isLoading: false,
        isError: false
    }
});

export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: {
        isLoading: false,
        isError: true,
        error: error
    }
});

export const fetchCategories = () => dispatch => {
    dispatch(fetchCategoriesRequest());
    axios.get('/categories')
        .then(categories => {
            dispatch(fetchCategoriesSuccess(categories.data));
        })
        .catch(err => {
            dispatch(fetchCategoriesFailure(err));
        })
};