import React from 'react';
import axios from 'axios';
import './Profile.css';
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import images from '../../ProjectImages/ProjectImages';
import LoginString from '../Login/LoginStrings';

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
        };
        this.newPhotoUrl = '';
        this.onChangeNickname = this.onChangeNickname.bind(this);
        this.onChangeAboutMe = this.onChangeAboutMe.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    componentDidMount() {
        if (!localStorage.getItem(LoginString.ID)) {
            this.props.history.push('/');
        }
    }

    onChangeNickname = (event) => {
        this.setState({
            name: event.target.value,
        });
    };

    onChangeAboutMe = (event) => {
        this.setState({
            aboutMe: event.target.value,
        });
    };

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
                const res = await axios.post('/api/user/avatar', formData, {
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
            };
        } else {
            newInfo = {
                name: this.state.name,
                description: this.state.aboutMe,
                url: '',
                userId: localStorage.getItem(LoginString.ID),
                docId: localStorage.getItem(LoginString.FirebaseDocumentId),
            };
        }
        axios.put('/api/user', newInfo)
            .then((response) => {
                localStorage.setItem(LoginString.Name, this.state.name);
                localStorage.setItem(LoginString.Description, this.state.aboutMe);
                if (isUpdatedPhotoURL) {
                    localStorage.setItem(LoginString.PhotoURL, downloadURL);
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
                <img className="avatar" alt="" src={this.state.photoUrl}/>
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
                <span className="textLabel">Name</span>
                <input
                    className="textInput"
                    value={this.state.name ? this.state.name : ''}
                    placeholder="Your nickname..."
                    onChange={this.onChangeNickname}
                />
                <span className="textLabel">About Me</span>
                <input
                    className="textInput"
                    value={this.state.aboutMe ? this.state.aboutMe : ''}
                    placeholder="Tell about yourself..."
                    onChange={this.onChangeAboutMe}
                />
                <div>
                    <button className="btnUpdate" onClick={this.uploadAvatar}>
                        SAVE
                    </button>
                    <button className="btnback" onClick={() => {
                        this.props.history.push('/chat');
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