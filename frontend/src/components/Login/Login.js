import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
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
                <Form>
                    <FormGroup>
                        <Label for="email-input">Email</Label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                {/*<span className="input-group-text"><FontAwesomeIcon className="input-group-text" icon={faUser}/></span>*/}
                                <span className="input-group-text">@</span>
                            </div>
                            <Input
                                type="email"
                                name="email"
                                id="email-input"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password-input">Password</Label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                {/*<span className="input-group-text"><FontAwesomeIcon size="lg" icon={faLock}/></span>*/}
                                <span className="input-group-text">@</span>
                            </div>
                            <Input
                                type="password"
                                name="password"
                                id="password-input"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                </Form>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;