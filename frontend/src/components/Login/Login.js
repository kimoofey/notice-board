import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";

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
            <div>
                <Form>
                    <FormGroup>
                        <Label for="email-input">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email-input"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password-input">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password-input"
                            placeholder="Enter password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </FormGroup>
                    <input type="submit" value="Submit"/>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;