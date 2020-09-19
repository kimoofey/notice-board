import React from 'react';
import firebase from '../../Services/firebase';
import LoginString from '../Login/LoginStrings';
import './SecretPass.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export default class SecretPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.safeCode = localStorage.getItem(LoginString.SafeCode);
        this.passCode = localStorage.getItem(LoginString.PassCode);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        switch (this.state.password) {
            case this.safeCode:
                this.props.history.push('/schat');
                break;
            case this.passCode:
                this.props.history.push('/chat');
                break;
            default:
                console.log('none');
                this.props.showToast(2, 'Incorrect password');
                break;
        }
    }

    logout = () => {
        firebase.auth().signOut();
        this.props.history.push('/');
        localStorage.clear();
    };

    render() {
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
            <Grid container component="main" justify="center" alignItems="center" style={root}>
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
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                        {/*<button className="Logout" onClick={this.logout}>Logout</button>*/}
                        <div className="CenterAliningItems">
                            <button className="button1" type="submit">
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </Grid>
        );
    }
}