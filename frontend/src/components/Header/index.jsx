import React, { Component } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        logoutUser();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Notice Board
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                Home <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>
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
                                <a className="dropdown-item" href="#">
                                    Daily Deals
                                </a>
                                <a className="dropdown-item" href="#">
                                    Create Application
                                </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link disabled"
                                href="#"
                                tabIndex="-1"
                                aria-disabled="true"
                            >
                                Disabled
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/account/">
                                My profile
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={this.onLogoutClick}
                            >
                                Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    // logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Header);
