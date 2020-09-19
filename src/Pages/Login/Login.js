import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import LoginString from '../Login/LoginStrings';
import './Login.css';
import {Card} from 'react-bootstrap';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            password: '',
            error: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    componentDidMount() {
        if (localStorage.getItem(LoginString.ID)) {
            this.setState({isLoading: false}, () => {
                this.setState({isLoading: false});
                this.props.showToast(1, 'Login succes');
                this.props.history.push('./password');
            });
        } else {
            this.setState({isLoading: false});
        }
    }

    componentWillUnmount() {
        this.setState({email: '', password: '', error: ''})
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.email.length === 0 || this.state.password.length === 0) {
            this.setState({error: 'Fill all inputs!'});
            return;
        }
        await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user/auth', {
            email: this.state.email,
            password: this.state.password,
        },)
            .then((currentdata) => {
                const {data} = currentdata;
                if (currentdata) {
                    localStorage.setItem(LoginString.FirebaseDocumentId, data[0].docId);
                    localStorage.setItem(LoginString.ID, data[0].id);
                    localStorage.setItem(LoginString.Name, data[0].name);
                    localStorage.setItem(LoginString.Email, data[0].email);
                    localStorage.setItem(LoginString.Password, data[0].password);
                    localStorage.setItem(LoginString.PhotoURL, data[0].URL);
                    localStorage.setItem(LoginString.Description, data[0].description);
                    this.props.history.push('/password');
                }
            })
            .catch((error) => {
                const responseMsg = error.response ? error.response.data.message : 'Incorrect email/password or poor internet';
                this.props.showToast(2, responseMsg);
            });
        this.setState({error: ''});
    }

    render() {
        const paper = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '10px',
            paddingRight: '10px',

        };
        const rightcomponent = {
            boxShadow: '0 80px 80px #808888',
            backgroundColor: 'smokegrey',
        };

        const root = {
            height: '100vh',
            background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)',

            marginBottom: '50px',
        };
        const Signinsee = {

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'White',
            marginBottom: '20px',
            backgroundColor: '#1ebea5',
            width: '100%',
            boxShadow: ' 0 5px 5px #808888',
            height: '10rem',
            paddingTop: '48px',
            opacity: '0.5',
            borderBottom: '5px solid green',


        };
        const form = {
            width: '100%', // Fix IE 11 issue.
            marginTop: '50px',
        };
        const avatar = {
            backgroundColor: 'green',
        };
        return (
            <Grid container component="main" style={root}>
                <CssBaseline/>
                <Grid item xs={1} sm={4} md={7} className="image">
                    <div className="image1"></div>
                </Grid>
                <Grid item xs={12} sm={8} md={5} style={rightcomponent} elevation={6} square>
                    <Card style={Signinsee}>
                        <div>
                            <Avatar style={avatar}>
                                <LockOutlinedIcon width="50px" height="50px"/>
                            </Avatar>
                        </div>
                        <div>
                            <Typography component="h1" variant="h5"
                                        Sign in
                                        To
                            />
                        </div>
                        <div>
                            <Link to="/">
                                <button class="btn">
                                    <i class="fa fa-home"></i>
                                    WebChat
                                </button>
                            </Link>
                        </div>
                    </Card>
                    <div style={paper}>
                        <form style={form} noValidate onSubmit={this.handleSubmit}>
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
                                onChange={this.handleChange}
                                value={this.state.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                                value={this.state.password}
                            />
                            <Typography component="h6" variant="h5">
                                {this.state.error ? (
                                    <p className="text-danger">{this.state.error}</p>
                                ) : null}
                            </Typography>

                            <div className="CenterAliningItems">
                                <button class="button1" type="submit">
                                    <span>Login In</span>
                                </button>
                            </div>

                            <div className="CenterAliningItems">
                                <p>Don't have and account?</p>
                                <Link to="/signup" variant="body2">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}