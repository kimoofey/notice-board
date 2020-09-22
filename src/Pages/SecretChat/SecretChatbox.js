import React from 'react';
import { Card } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import firebase from '../../Services/firebase';
import images from '../../ProjectImages/ProjectImages';
import moment from 'moment';
import '../Chatbox/Chatbox.css';
import LoginString from '../Login/LoginStrings';
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from '@material-ui/core/Avatar';

export default class FakeChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isShowStiker: false,
            inputValue: '',

        };

        this.currentUserName = localStorage.getItem(LoginString.Name);
        this.currentUserId = localStorage.getItem(LoginString.ID);
        this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);
        this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId);
        this.stateChanged = localStorage.getItem(LoginString.UPLOAD_CHANGED);
        this.currentPeerUser = this.props.currentPeerUser;
        this.groupChatId = null;
        this.listMessage = [];
        this.currentPeerUserMessages = [];
        this.removeListener = null;
        this.currentPhotoFile = null;
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.currentPeerUser) {
            this.currentPeerUser = newProps.currentPeerUser;
            this.listMessage = [];
            this.getListHistory();
        }
    }

    componentDidMount() {
        this.getListHistory();
    }

    componentWillUnmount() {
        this.listMessage = [];
    }

    getListHistory = async () => {
        this.setState({ isLoading: true });
        this.listMessage.length = 0;
        let response = [];
        if (this.props.currentPeerUser.api) {
            response = await axios.get(this.props.currentPeerUser.api);
        } else {
            response = await axios.get(this.props.currentPeerUser.msg);
        }
        const data = await response.data.data.children.map(post => post.data);
        this.listMessage = await data.filter(item => (!item.is_video && !item.is_gallery)).map((item, index) => ({
            _id: index,
            text: item.title,
            createdAt: new Date(),
            image: item.url,
            user: {
                _id: 0,
                name: item.name,
                avatar: item.URL,
            },
        }));
        this.setState({ isLoading: false });
    };

    onSendMessage = (content, type) => {
        if (this.state.isShowStiker && type === 2) {
            this.setState({ isShowStiker: false });
        }
        if (content.trim() === '') {
            return;
        }

        const timestamp = moment()
            .valueOf()
            .toString();

        const itemMessage = type === 0 ? {
                _id: timestamp,
                text: content.trim(),
                createdAt: moment().toString(),
                idFrom: this.currentUserId,
                idTo: this.currentPeerUser.id,
                user: {
                    _id: this.currentUserId,
                    avatar: this.currentUserPhoto,
                    name: this.currentUserName,
                },
            }
            : {
                _id: timestamp,
                URL: content.trim(),
                createdAt: moment().toString(),
                idFrom: this.currentUserId,
                idTo: this.currentPeerUser.id,
                user: {
                    _id: this.currentUserId,
                    avatar: this.currentUserPhoto,
                    name: this.currentUserName,
                },
            };

        this.listMessage.push(itemMessage);

        this.setState({ inputValue: '' });
    };
    scrollToBottom = () => {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView({});
        }
    };
    onKeyboardPress = event => {
        if (event.key === 'Enter') {
            this.onSendMessage(this.state.inputValue, 0);
        }
    };

    onChoosePhoto = event => {
        if (event.target.files && event.target.files[0]) {
            this.setState({ isLoading: true });
            this.currentPhotoFile = event.target.files[0];
            const prefixFiletype = event.target.files[0].type.toString();
            if (prefixFiletype.indexOf('image/') === 0) {
                this.uploadPhoto();
            } else {
                this.setState({ isLoading: false });
                this.props.showToast(0, 'This file is not an image');
            }
        } else {
            this.setState({ isLoading: false });
        }
    };
    uploadPhoto = () => {
        if (this.currentPhotoFile) {
            const timestamp = moment()
                .valueOf()
                .toString();

            const uploadTask = firebase.storage()
                .ref()
                .child(timestamp)
                .put(this.currentPhotoFile);

            uploadTask.on(
                LoginString.UPLOAD_CHANGED,
                null,
                err => {
                    this.setState({ isLoading: false });
                    this.props.showToast(0, err.message);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        this.setState({ isLoading: false });
                        this.onSendMessage(downloadURL, 1);
                    });
                },
            );
        } else {
            this.setState({ isLoading: false });
            this.props.showToast(0, 'File is null');
        }
    };
    renderListMessage = () => {
        if (this.listMessage.length > 0) {
            let viewListMessage = [];
            this.listMessage.forEach((item, index) => {
                if (item.idFrom === this.currentUserId) {
                    if (item.type === 0) {
                        viewListMessage.push(
                            <div className="viewItemRight" key={item.timestamp}>
                                <span className="textContentItem">{item.text}</span>
                            </div>,
                        );
                    } else if (item.image) {
                        viewListMessage.push(
                            <div className="viewItemRight2" key={item.timestamp}>
                                <img
                                    className="imgItemRight"
                                    src={item.image}
                                    alt="content message"
                                />
                            </div>,
                        );
                    } else {
                        viewListMessage.push(
                            <div className="viewItemRight" key={item.timestamp}>
                                <span className="textContentItem">{item.text}</span>

                            </div>,
                        );
                    }
                } else {
                    // message
                    if (item.type === 0) {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft" key={item.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        item.URL
                                            ? (<img
                                                className="peerAvatarLeft"
                                                src={item.URL}
                                                alt=""
                                            />)
                                            : (<Avatar
                                                className="peerAvatarLeft">{this.props.currentPeerUser.slice(0, 2)}</Avatar>)
                                    ) : (
                                        <div className="viewPaddingLeft"/>
                                    )}
                                    <div className="viewItemLeft">
                                        <span className="textContentItem">{item.text}</span>
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                   <div className='time'>
                    {moment(item.timestamp).format('ll')}
                    </div>
                  </span>
                                ) : null}
                            </div>,
                        );
                        // image
                    } else if (item.image) {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft2" key={item.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        this.props.currentPeerUser.URL
                                            ? (<img
                                                className="peerAvatarLeft"
                                                src={this.props.currentPeerUser.URL}
                                                alt=""
                                            />)
                                            : (<Avatar
                                                className="peerAvatarLeft">{this.props.currentPeerUser.name.slice(0, 2)}</Avatar>)
                                    ) : (
                                        <div className="viewPaddingLeft"/>
                                    )}
                                    <div className="viewItemLeft2">
                                        {this.props.currentPeerUser.api ? (
                                            <div className="viewItemLeft">
                                                <span className="textContentItem">{item.text}</span>
                                            </div>
                                        ) : null}
                                        <img
                                            className="imgItemLeft"
                                            src={item.image}
                                            alt="content message"
                                        />
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                    <div className='time'>
                    {moment(item.timestamp).format('ll')}
                    </div>
                  </span>
                                ) : null}
                            </div>,
                        );
                    } else {
                        viewListMessage.push(
                            <div className="viewWrapItemLeft" key={item.timestamp}>
                                <div className="viewWrapItemLeft3">
                                    {this.isLastMessageLeft(index) ? (
                                        <img
                                            src={this.currentPeerUser.URL}
                                            alt="avatar"
                                            className="peerAvatarLeft"
                                        />
                                    ) : (
                                        <div className="viewPaddingLeft"/>
                                    )}
                                    <div className="viewItemLeft">
                                        <span className="textContentItem">{item.text}</span>
                                    </div>
                                </div>
                                {this.isLastMessageLeft(index) ? (
                                    <span className="textTimeLeft">
                   <div className='time'>
                    {moment(item.timestamp).format('ll')}
                    </div>
                  </span>
                                ) : null}
                            </div>,
                        );
                    }
                }
            });
            return viewListMessage;
        } else {
            return (
                <div className="viewWrapSayHi">
                    <span className="textSayHi">Say hi to new friend</span>
                    <img
                        className="imgWaveHand"
                        src={images.wave_hand}
                        alt="wave hand"
                    />
                </div>
            );
        }
    };

    isLastMessageLeft(index) {
        if (
            (index + 1 < this.listMessage.length &&
                this.listMessage[index + 1].idFrom === this.currentUserId) ||
            index === this.listMessage.length - 1
        ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <Card className="viewChatBoard">
                <div className="headerChatBoard">
                    {this.currentPeerUser.URL
                        ? (<img
                            className="viewAvatarItem"
                            src={this.currentPeerUser.URL}
                            alt=""
                        />)
                        : (<Avatar className="viewAvatarItem" style={{
                            width: '50px',
                            height: '50px',
                            fontSize: 16,
                        }}>{this.currentPeerUser.name.slice(0, 2)}</Avatar>)
                    }
                    <span className="textHeaderChatBoard">
                    <p style={{ fontSize: '20px' }}> {this.currentPeerUser.name}</p>
                </span>
                    <div className="aboutme">
                        <span><p>{this.currentPeerUser.description}</p></span>
                    </div>
                </div>
                <div className="viewListContentChat">
                    {this.renderListMessage()}
                    <div
                        style={{ float: 'left', clear: 'both' }}
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                    />
                </div>
                <div className="viewBottom">
                    <img
                        className="icOpenGallery"
                        src={images.input_file}
                        alt="icon open gallery"
                        onClick={() => this.refInput.click()}
                    />
                    <input
                        ref={el => {
                            this.refInput = el;
                        }}
                        accept="image/*"
                        className="viewInputGallery"
                        type="file"
                        onChange={this.onChoosePhoto}
                    />

                    <input
                        className="viewInput"
                        placeholder="Type a message"
                        value={this.state.inputValue}
                        onChange={event => {
                            this.setState({ inputValue: event.target.value });
                        }}
                        onKeyPress={this.onKeyboardPress}
                        disabled={!!this.currentPeerUser.api}
                    />
                    <img
                        className="icSend"
                        src={images.send}
                        alt="icon send"
                        onClick={() => this.onSendMessage(this.state.inputValue, 0)}
                    />
                </div>
                {this.state.isLoading ? (
                    <div className="viewLoading">
                        <ReactLoading
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        />
                    </div>
                ) : null}
            </Card>
        );
    }

}
