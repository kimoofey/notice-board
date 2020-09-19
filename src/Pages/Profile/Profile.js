import React from 'react';
import axios from 'axios';
import './Profile.css';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import images from '../../ProjectImages/ProjectImages';
import LoginString from '../Login/LoginStrings';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField/TextField';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            documentKey: localStorage.getItem(LoginString.FirebaseDocumentId),
            id: localStorage.getItem(LoginString.ID),
            name: localStorage.getItem(LoginString.Name),
            aboutMe: localStorage.getItem(LoginString.Description),
            photoUrl: localStorage.getItem(LoginString.PhotoURL),
            newPhoto: null,
            safeCode: '',
            passCode: '',
        };
        this.newPhotoUrl = '';
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
        this.handlechange = this.handlechange.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.location.state === 'undefined') {
            this.props.history.push('/password');
        }
        if (!localStorage.getItem(LoginString.ID)) {
            this.props.history.push('/login');
        }
    }

    handlechange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onChangeAvatar = (event) => {
        if (event.target.files && event.target.files[0]) {
            const prefixFiletype = event.target.files[0].type.toString();
            if (prefixFiletype.indexOf(LoginString.PREFIX_IMAGE) !== 0) {
                this.props.showToast(0, 'This file is not an image');
                return;
            }
            this.setState({ newPhoto: event.target.files[0] });
            this.setState({ photoUrl: URL.createObjectURL(event.target.files[0]) });
        } else {
            this.props.showToast(0, 'Something wrong with input file');
        }
    };

    uploadAvatar = async () => {
        this.setState({ isLoading: true });
        if (this.state.newPhoto) {
            const formData = new FormData();
            formData.append('file', this.state.newPhoto);
            formData.append('userId', this.state.id);
            try {
                const res = await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user/avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.updateUserInfo(true, res.data.downloadURL);
            } catch (error) {
                if (error.response.status === 500) {
                    this.props.showToast(3, 'There was a problem with the server');
                } else {
                    this.props.showToast(3, error.response.data.msg);
                }
            }
        } else {
            this.updateUserInfo(false, null);
        }
    };

    updateUserInfo = async (isUpdatedPhotoURL, downloadURL) => {
        let newInfo;
        if (isUpdatedPhotoURL) {
            newInfo = {
                name: this.state.name,
                description: this.state.aboutMe,
                url: downloadURL,
                userId: localStorage.getItem(LoginString.ID),
                docId: localStorage.getItem(LoginString.FirebaseDocumentId),
                safeCode: this.state.safeCode,
                passCode: this.state.passCode,
            };
        } else {
            newInfo = {
                name: this.state.name,
                description: this.state.aboutMe,
                url: '',
                userId: localStorage.getItem(LoginString.ID),
                docId: localStorage.getItem(LoginString.FirebaseDocumentId),
                safeCode: this.state.safeCode,
                passCode: this.state.passCode,
            };
        }
        axios.put('https://web-notice-board-server-dev.herokuapp.com/api/user', newInfo)
            .then((response) => {
                localStorage.setItem(LoginString.Name, this.state.name);
                localStorage.setItem(LoginString.Description, this.state.aboutMe);
                if (isUpdatedPhotoURL) {
                    localStorage.setItem(LoginString.PhotoURL, downloadURL);
                }
                if (this.state.safeCode) {
                    localStorage.setItem(LoginString.safeCode, this.state.safeCode);
                }
                if (this.state.passCode) {
                    localStorage.setItem(LoginString.safeCode, this.state.passCode);
                }
                this.setState({ isLoading: false });
                this.props.showToast(1, 'Update info success');
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                this.props.showToast(0, 'There is some troubles. Please try again');
            });
    };

    render() {
        return (
            <div className="profileroot">
                <div className="headerprofile">
                    <span>PROFILE</span>
                </div>

                {this.state.photoUrl
                    ? (<img className="avatar" alt="" src={this.state.photoUrl}/>)
                    : (<Avatar className="avatar" style={{
                        width: '120px',
                        height: '120px',
                        fontSize: 48,
                        alignSelf: 'center',
                        marginTop: '50px',
                        marginBottom: '25px',
                    }}>{this.state.name.slice(0, 2)}</Avatar>)
                }
                <div className="viewWrapInputFile">
                    <img
                        className="imgInputFile"
                        alt="icon gallery"
                        src={images.choosefile}
                        onClick={() => {
                            this.refInput.click();
                        }}
                    />
                    <input
                        ref={el => {
                            this.refInput = el;
                        }}
                        accept="image/*"
                        className="viewInputFile"
                        type="file"
                        onChange={this.onChangeAvatar}
                        id="avatar-upload"
                    />
                </div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Your nickname"
                    name="name"
                    autoComplete="name"
                    onChange={this.handlechange}
                    value={this.state.name}
                    style={{
                        width: '500px',
                        color: 'white',
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="aboutMe"
                    label="Tell about yourself"
                    helperText="Brief description"
                    name="aboutMe"
                    onChange={this.handlechange}
                    value={this.state.aboutMe}
                    style={{
                        width: '500px',
                        color: 'white',
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Password for chat access"
                    helperText="Have to be four number character"
                    name="passCode"
                    type="password"
                    autoComplete="current-password"
                    inputProps={{ maxLength: 4 }}
                    onChange={this.handlechange}
                    value={this.state.passCode}
                    style={{
                        width: '500px',
                        color: 'white',
                    }}
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
                    style={{
                        width: '500px',
                        color: 'white',
                    }}
                />
                <div>
                    <button className="btnUpdate" onClick={this.uploadAvatar}>
                        SAVE
                    </button>
                    <button className="btnback" onClick={() => {
                        this.props.history.push({
                            pathname: '/chat',
                            state: {
                                checked: true,
                            },
                        });
                    }}>
                        BACK
                    </button>
                </div>
                {this.state.isLoading ? (
                    <div>
                        <ReactLoading
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        />

                    </div>
                ) : null}
            </div>
        );
    }
}