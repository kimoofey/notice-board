import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button } from "reactstrap"
import { logoutUser } from "../../actions/authActions"
import './UserAccount.css';

class UserAccount extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { user } = this.props.auth
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>Hey there, {user.email}</h4>
                        <p className="flow-text grey-text text-darken-1">
                            You are logged into a user account!
                        </p>
                        <Button onClick={this.onLogoutClick} color="danger">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

UserAccount.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.objectOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
})
export default connect(mapStateToProps, { logoutUser })(UserAccount)
