import React, {Component} from 'react';
import SignupForm from './LoginForm';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        alert('Auth will coming soon');
    };

    render() {
        return (
            <div className="container">
                <SignupForm/>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;