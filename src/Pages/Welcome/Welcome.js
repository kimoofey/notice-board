import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './Welcome.css';
import Avatar from '@material-ui/core/Avatar';

export default class WelocomeCard extends React.Component {
    render() {
        return (
            <div className="viewWelcomeBoard">
                {this.props.currentUserPhoto
                    ? (<img
                        className="avatarWelcome"
                        src={this.props.currentUserPhoto}
                        alt=""
                    />)
                    : (<Avatar className="avatarWelcome" style={{
                        width: '200px',
                        height: '200px',
                        fontSize: 64,
                    }}>{this.props.currentUserName.slice(0, 2)}</Avatar>)
                }
                <span className="textTitleWelcome">{`Welcome, ${this.props.currentUserName}`}</span>
                <span className="textDesciptionWelcome">
                    Let's connent the World
                </span>
            </div>
        );
    }
}