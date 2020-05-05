import React, {Component} from 'react';
import './App.css';
import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path='/' component={MainPage}/>
                        <Route path='/login' component={Login}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
