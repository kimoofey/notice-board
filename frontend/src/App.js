import React, {Component} from 'react';
import './App.css';
import MainPage from "./components/MainPage/MainPage";

class App extends Component {

    constructor(props) {
        super(props);
    }

    handleStartButton = () => {

    };

    render() {
        return (
            <div className="App">
                <MainPage handleStartButton={this.handleStartButton}/>
            </div>
        );
    }
}

export default App;
