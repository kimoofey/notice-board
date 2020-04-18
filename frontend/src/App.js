import React, {Component} from 'react';
import logo from './logo.svg'
import './App.css';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
        const {REACT_APP_ROCKET_URL} = process.env;
        this.baseUrl = `${REACT_APP_ROCKET_URL}/users`;
        console.log(process.env);
    }

    componentDidMount() {
        axios.get('/users')
            .then(response => this.setState({users: response.data}))
            .catch(error => console.log('error:', error));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <h1>Users</h1>
                    {this.state.users.map(user =>
                        <div key={user.id}>{user.username}</div>
                    )}
                </header>
            </div>
        );
    }
}

export default App;
