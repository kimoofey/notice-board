import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import MainPage from "./components/MainPage/MainPage";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    handleStartButton = () => {
        axios.get('/users')
            .then(response => this.setState({users: response.data}))
            .catch(error => console.log('error:', error));
    };

    render() {
        return (
            <div className="App">
                <MainPage handleStartButton={this.handleStartButton}/>
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}

export default App;
