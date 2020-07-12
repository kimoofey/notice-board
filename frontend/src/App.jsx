import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import Confirm from './components/Confirm';
import PrivateRoute from './components/PrivateRoute';
import UserAccount from './components/UserAccount';
import store from './reducers';
import Header from './components/Header';
import checkAuthToken from './utils/checkAuthToken';

class App extends Component {
    componentDidMount() {
        checkAuthToken();
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Header />
                        <Switch>
                            <Route exact path="/" component={MainPage} />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route
                                exact
                                path="/confirm/:id"
                                component={Confirm}
                            />
                            <PrivateRoute
                                exact
                                path="/account"
                                component={UserAccount}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
