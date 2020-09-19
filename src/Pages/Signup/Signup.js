import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { Card } from 'react-bootstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoginString from '../Login/LoginStrings';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            safeCode:'',
            passCode:'',
            error: null,
        };
        this.handlechange = this.handlechange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlechange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async handleSubmit(event) {
        const { password, email, name, safeCode, passCode } = this.state;
        event.preventDefault();
        this.setState({ error: '' });
        await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user', {
            email: email,
            password: password,
            nickname: name,
            safeCode: safeCode,
            passCode: passCode,
        })
            .then((response) => {
                localStorage.setItem(LoginString.FirebaseDocumentId, response.data.docId);
                localStorage.setItem(LoginString.ID, response.data.id);
                localStorage.setItem(LoginString.Name, response.data.name);
                localStorage.setItem(LoginString.PhotoURL, response.data.URL);
                localStorage.setItem(LoginString.Description, response.data.description);
                localStorage.setItem(LoginString.SafeCode, response.data.safeCode);
                localStorage.setItem(LoginString.PassCode, response.data.passCode);

                this.setState({
                    name: '',
                    password: '',
                    url: '',
                    safeCode: '',
                    passCode: '',
                });

                this.props.history.push('/chat');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'White',
            backgroundColor: '#1ebea5',
            width: '100%',
            boxShadow: ' 0 5px 5px #808888',
            height: '10rem',
            paddingTop: '48px',
            opacity: '0.5',
            borderBottom: '5px solid green',
        };
        return (
            <div>
                <CssBaseline/>
                <Card style={Signinsee}>
                    <div>
                        <Typography component="h1" variant="h5">
                            Sign Up
                            To
                        </Typography>
                    </div>
                    <div>
                        <Link to="/">
                            <button className="btn"><i className="fa fa-home"/>WebChat</button>
                        </Link>
                    </div>
                </Card>
                <Card className="formacontrooutside">
                    <form className="customform" noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            helperText="Password should be greater than 6 (alphabet, number, special character)"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            onChange={this.handlechange}
                            value={this.state.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password for chat access"
                            helperText="Have to be four number character"
                            name="passCode"
                            type="password"
                            autoComplete="current-password"
                            inputProps={{ maxLength: 4 }}
                            onChange={this.handlechange}
                            value={this.state.passCode}
                        />
                         <TextField
                             variant="outlined"
                             margin="normal"
                             required
                             fullWidth
                             label="Password for fake chat access"
                             helperText="Have to be four number character"
                             name="safeCode"
                             type="password"
                             autoComplete="current-password"
                             inputProps={{ maxLength: 4 }}
                             onChange={this.handlechange}
                             value={this.state.safeCode}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.name}
                        />
                        <div className="CenterAliningItems">
                            <button className="button1">
                                <span>Sign Up</span>
                            </button>
                        </div>
                        <div>
                            <p style={{ color: 'grey' }}>Already have and account?</p>
                            <Link to="/login">
                                Login In
                            </Link>
                        </div>
                        <div className="error">
                            <p id='1' style={{ color: 'red' }}></p>

                        </div>

                    </form>
                </Card>


            </div>
        );
    }
}