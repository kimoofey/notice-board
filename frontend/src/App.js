import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import './App.css';
import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Confirm from "./components/Register/Confirm";
import setAuthToken from "./utils/setAuthToken";
import {logoutUser, setCurrentUser} from "./actions/authActions";
import PrivateRoute from './components/PrivateRoute';
import UserAccount from './components/UserAccount';
import store from "./reducers";
import {Provider} from "react-redux";

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = './login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Switch>
                            <Route exact path='/' component={MainPage}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/confirm/:id' component={Confirm}/>
                            <PrivateRoute exact path='/account' component={UserAccount}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
