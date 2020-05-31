import { SET_CURRENT_USER, USER_LOADING } from '../constants/AuthTypes';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !action.payload.isEmpty(),
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
