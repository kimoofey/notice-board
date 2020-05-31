import {
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
    isLoading: true,
    isError: true,
    error: null,
    categories: [],
};

export default function CategoriesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };

        case FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: action.payload.error,
            };

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                categories: action.payload.categories,
            };

        default:
            return state;
    }
}
