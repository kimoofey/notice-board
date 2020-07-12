import jwtDecode from 'jwt-decode';
import store from '../reducers';
import { logoutUser, setCurrentUser } from '../actions/authActions';
import setAuthToken from './setAuthToken';

const checkAuthToken = () => {
    if (localStorage.jwtToken) {
        const token = localStorage.jwtToken;
        setAuthToken(token);
        const decoded = jwtDecode(token);
        store.dispatch(setCurrentUser(decoded));

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            store.dispatch(logoutUser());
            window.location.href = './login';
        }
    }
};

export default checkAuthToken;
