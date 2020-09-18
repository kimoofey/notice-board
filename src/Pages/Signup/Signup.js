import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import {Card} from 'react-bootstrap';
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

        const {password, email, name} = this.state;
        event.preventDefault();
        this.setState({error: ''});
        await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user', {
            email: email,
            password: password,
            nickname: name,
        })
            .then((response) => {
                localStorage.setItem(LoginString.FirebaseDocumentId, response.data.docId);
                localStorage.setItem(LoginString.ID, response.data.id);
                localStorage.setItem(LoginString.Name, response.data.name);
                localStorage.setItem(LoginString.Email, response.data.email);
                localStorage.setItem(LoginString.Password, response.data.password);
                localStorage.setItem(LoginString.PhotoURL, response.data.URL);
                localStorage.setItem(LoginString.Description, response.data.description);

                this.setState({
                    name: '',
                    password: '',
                    url: '',
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
                            <button class="btn"><i class="fa fa-home"></i> WebChat</button>
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
                            label="Email Address-example:abc@gmail.com"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.email}
                        />
                        <div>
                            <p style={{color: 'grey', fontSize: '15px', marginLeft: '0'}}>Password :length Greater
                                than 6 (alphabet,number,special character)</p>
                        </div>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            autoFocus
                            onChange={this.handlechange}
                            value={this.state.password}
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
                        <div>
                            <p style={{color: 'grey', fontSize: '15px'}}>Please fill all fields and password should be
                                greater than 6</p>
                        </div>
                        <div className="CenterAliningItems">
                            <button class="button1">
                                <span>Sign Up</span>
                            </button>
                        </div>
                        <div>
                            <p style={{color: 'grey'}}>Already have and account?</p>
                            <Link to="/login">
                                Login In
                            </Link>
                        </div>
                        <div className="error">
                            <p id='1' style={{color: 'red'}}></p>

                        </div>

                    </form>
                </Card>


            </div>
        );
    }
}