import React from 'react';
import axios from 'axios';
import LoginString from '../Login/LoginStrings';
import firebase from '../../Services/firebase';
import './SecretChat.css';
import images from '../../ProjectImages/ProjectImages';
import FakeChatBox from './SecretChatbox';
import WelcomeBoard from '../Welcome/Welcome';
import Avatar from '@material-ui/core/Avatar';

export default class SecretChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isOpenDialogConfirmLogout: false,
            currentPeerUser: null,
            displayedContacts: [],
            displayedContactswithNotification: [],
        };
        this.currentUserDocumentId = localStorage.getItem(LoginString.FirebaseDocumentId);
        this.currentUserId = localStorage.getItem(LoginString.ID);
        this.currentUserPhoto = localStorage.getItem(LoginString.PhotoURL);

        this.currentUserName = localStorage.getItem(LoginString.Name);
        this.currentUserMessages = [];

        this.searchUsers = [];
        this.displayedContacts = [];
        this.currentUserMessages = [];
        this.notificationMessagesErase = [];
        this.getListUsers = this.getListUsers.bind(this);
        this.renderListUser = this.renderListUser.bind(this);
        this.notificationErase = this.notificationErase.bind(this);
    }

    logout = () => {
        firebase.auth().signOut();
        this.props.history.push('/');
        localStorage.clear();
    };

    onProfileClick = () => {
        this.props.history.push('/profile');
    };

    componentDidMount() {
        // let notificationMessages = [];
        axios.get('https://web-notice-board-server-dev.herokuapp.com/api/user/messages', {
            params: {
                docId: this.currentUserDocumentId,
            },
        })
            .then((response) => {
                this.setState({
                    displayedContactswithNotification: response.data,
                });
            });
        this.getListUsers();
    }

    getListUsers = async () => {
        this.searchUsers = [
            {
                URL: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                description: 'Best memes for you',
                id: '',
                name: 'Memes',
                api: 'https://www.reddit.com/r/memes/top/.json?count=10',
                key: 1,
            },
            {
                URL: 'https://styles.redditmedia.com/t5_2v2cd/styles/communityIcon_p74cmkrdpaq41.jpg',
                description: 'History memes and jokes go here',
                id: '',
                name: 'History memes',
                api: 'https://www.reddit.com/r/HistoryMemes/top/.json?count=10',
                key: 2,
            },
            {
                URL: 'https://styles.redditmedia.com/t5_2r1tc/styles/communityIcon_p1gzakhq6y201.png',
                description: 'A channel about photography techniques and styles',
                id: '',
                name: 'I Took a Picture',
                api: 'https://www.reddit.com/r/itookapicture/top/.json?count=10',
                key: 3,
            },
            {
                URL: '',
                description: '',
                id: '',
                name: 'Mom',
                msg: 'https://www.reddit.com/r/teefies/top/.json?count=10',
                key: 4,
            },
        ];

        this.renderListUser();
    };

    getClassnameforUserandNotification = (itemId) => {
        // let number = 0;
        let className = '';
        let check = false;
        if (this.state.currentPeerUser &&
            this.state.currentPeerUser.id === itemId) {

            className = 'viewWrapItemFocused';

        } else {
            this.state.displayedContactswithNotification.forEach((item) => {
                if (item.notificationId.length > 0) {
                    if (item.notificationId === itemId) {
                        check = true;
                        // number = item.number;
                    }
                }
            });
            if (check === true) {
                className = 'viewWrapItemNotification';
            } else {
                className = 'viewWrapItem';
            }
        }
        return className;

    };

    notificationErase = (itemId) => {
        this.state.displayedContactswithNotification.forEach((el) => {
            if (el.notificationId.length > 0) {
                if (el.notificationId !== itemId) {
                    this.notificationMessagesErase.push(
                        {
                            notificationId: el.notificationId,
                            number: el.number,
                        },
                    );
                }
            }

        });
        this.updaterenderlist();
    };

    updaterenderlist = () => {
        axios.put('https://web-notice-board-server-dev.herokuapp.com/api/user/messages', {
            docId: this.currentUserDocumentId,
            messages: this.notificationMessagesErase,
        })
            .then((response) => {
                this.setState({
                    displayedContactswithNotification: this.notificationMessagesErase,
                });
            });
    };

    renderListUser = () => {
        if (this.searchUsers.length > 0) {
            let viewListUser = [];
            let classname = '';
            this.searchUsers.forEach((item) => {
                if (item.id !== this.currentUserId) {
                    classname = this.getClassnameforUserandNotification(item.id);
                    viewListUser.push(
                        <button

                            id={item.key}

                            className={classname}

                            onClick={() => {
                                this.notificationErase(item.id);
                                this.setState({
                                    currentPeerUser: item,
                                    displayedContactswithNotification: this.notificationMessagesErase,
                                });
                                document.getElementById(item.key).style.backgroundColor = '#fff';
                                if (document.getElementById(item.key)) {
                                    document.getElementById(item.key).style.color = '#fff';
                                }
                            }}
                        >
                            {item.URL
                                ? (<img
                                    className="viewAvatarItem"
                                    src={item.URL}
                                    alt=""
                                />)
                                : (<Avatar className="viewAvatarItem">{item.name.slice(0, 2)}</Avatar>)
                            }

                            <div className="viewWrapContentItem">
                                <span className="textItem">{item.name}</span>
                            </div>
                            {classname === 'viewWrapItemNotification' ?
                                <div className='notificationpragraph'>
                                    <p id={item.key} className="newmessages">New</p>
                                </div> : null}
                        </button>,
                    );
                }

            });
            this.setState({
                displayedContacts: viewListUser,
            });

        } else {
            console.log('No user is present');
        }
    };

    searchHandler = (event) => {
        let searchQuery = event.target.value.toLowerCase(),
            displayedContacts = this.searchUsers.filter((el) => {
                let SearchValue = el.name.toLowerCase();
                return SearchValue.indexOf(searchQuery) !== -1;
            });
        this.displayedContacts = displayedContacts;
        this.displaySearchedContacts();
    };

    displaySearchedContacts = () => {
        if (this.searchUsers.length > 0) {
            let viewListUser = [];
            let classname = '';
            this.displayedContacts.forEach((item) => {
                if (item.id !== this.currentUserId) {
                    classname = this.getClassnameforUserandNotification(item.id);
                    viewListUser.push(
                        <button

                            id={item.key}

                            className={classname}

                            onClick={() => {
                                this.notificationErase(item.id);
                                this.setState({
                                    currentPeerUser: item,
                                    displayedContactswithNotification: this.notificationMessagesErase,
                                });
                                document.getElementById(item.key).style.backgroundColor = '#fff';
                                if (document.getElementById(item.key)) {
                                    document.getElementById(item.key).style.color = '#fff';
                                }
                            }}
                        >
                            {item.URL
                                ? (<img
                                    className="viewAvatarItem"
                                    src={item.URL}
                                    alt=""
                                    placeholder={images.emptyphoto}
                                />)
                                : (<Avatar className="viewAvatarItem">{item.name.slice(0, 2)}</Avatar>)
                            }

                            <div className="viewWrapContentItem">
                                <span className="textItem">{item.name}</span>
                            </div>
                            {classname === 'viewWrapItemNotification' ?
                                <div className='notificationpragraph'>
                                    <p id={item.key} className="newmessages">New messages</p>
                                </div> : null}
                        </button>,
                    );
                }

            });
            this.setState({
                displayedContacts: viewListUser,
            });

        } else {
            console.log('No user is present');
        }
    };

    render() {
        return (
            <div className="root">
                <div className="body">
                    <div className="viewListUser">
                        <div className="profileviewleftside">
                            <img
                                className="ProfilePicture"
                                alt=""
                                src={this.currentUserPhoto}
                                onClick={this.onProfileClick}
                            />
                            <button className="Logout" onClick={this.logout}>Logout</button>
                        </div>
                        <div className="rootsearchbar">
                            <div className="input-container">
                                <i className="fa fa-search icon"></i>
                                <input className="input-field"
                                       type="text"
                                       onChange={this.searchHandler}
                                       placeholder="Search"
                                />
                            </div>
                        </div>
                        {this.state.displayedContacts}
                    </div>
                    <div className="viewBoard">
                        {this.state.currentPeerUser ? (
                            <FakeChatBox currentPeerUser={this.state.currentPeerUser}
                                         showToast={this.props.showToast}
                            />) : (<WelcomeBoard
                                currentUserName={this.currentUserName}
                                currentUserPhoto={this.currentUserPhoto}/>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}