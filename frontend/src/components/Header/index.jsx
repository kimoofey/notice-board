import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import './Header.css';

class Header extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        return (
            <nav className="navbar navbar-expand fixed-top navigation">
                <Link className="navbar-brand" to="/">
                    Notice Board
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Dropdown
                            </a>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link className="dropdown-item" to="/">
                                    Daily Deals
                                </Link>
                                <Link className="dropdown-item" to="/">
                                    Create Application
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item navigation--profile-link">
                            <Link className="nav-link" to="/account">
                                My profile
                            </Link>
                        </li>
                        <li className="nav-item navigation--logout-link">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onLogoutClick}
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Header);
