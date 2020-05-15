import React, {Component} from 'react';
import './App.css';
import MainPage from "./components/MainPage/MainPage";
import Login from "./components/Login/Login";
import Confirm from "./components/Login/Confirm";
import {BrowserRouter, Route, Switch} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={MainPage}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/confirm/:id' component={Confirm}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
