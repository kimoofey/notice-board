import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import LoginString from '../Login/LoginStrings';
import './SecretPass.css';
import {Card} from 'react-bootstrap';
import firebase from '../../Services/firebase';

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
    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.password.length === 0) {
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
                    localStorage.setItem(LoginString.Password1, data[0].safeCode);
                    localStorage.setItem(LoginString.Password2, data[0].passCode);
                    this.props.history.push('/chat');
                }
            })
            .catch((error) => {
                const responseMsg = error.response ? error.response.data.message : 'Incorrect password or poor internet';
                this.props.showToast(2, responseMsg);
            });
        this.setState({error: ''});

    }
    componentDidMount() {
        if (localStorage.getItem(LoginString.ID)) {
            this.setState({isLoading: false}, () => {
                this.setState({isLoading: false});
                this.props.showToast(1, 'Login succes');
               // this.props.history.push('./schat');
            });
        } else {
            this.setState({isLoading: false});
        }
        
    }
    logout = () => {
        firebase.auth().signOut();
        this.props.history.push('/');
        localStorage.clear();
    };
    render(){
        const paper = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '10px',
            paddingRight: '10px',

        };
        const root = {
            height: '100vh',
            background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)',

            marginBottom: '50px',
        };
        const form = {
            width: '100%', // Fix IE 11 issue.
            marginTop: '50px',
        };
        return (
            <Grid container component="main" style={root}>
            <div style={paper}>
                        <form style={form} noValidate onSubmit={this.handleSubmit}>
                       
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
                            <button className="Logout" onClick={this.logout}>Logout</button>
                            <Typography component="h6" variant="h5">
                                {this.state.error ? (
                                    <p className="text-danger">{this.state.error}</p>
                                ) : null}
                            </Typography>
                            <div className="CenterAliningItems">
                                <button class="button1" type="submit">
                                    <span>Done</span>
                                </button>
                            </div>
                             </form>
            </div>
            </Grid>
        )
    }
}