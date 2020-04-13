import React, {Component} from 'react';
import './App.css';
import MainPage from "./Components/MainPage/MainPage";
import Navigation from "./Components/Navigation/Navigation";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navigation/>
                <MainPage/>
            </div>
        );
    }
}

export default App;
