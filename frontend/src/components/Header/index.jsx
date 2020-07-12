import React, { Component } from 'react';
import {
    Button,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavLink,
    UncontrolledDropdown,
} from 'reactstrap';
import './Header.css';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDropdown: false,
            isOpenBurger: false,
        };
    }

    onLogoutClick(e) {
        e.preventDefault();
        logoutUser();
    }

    handleBurgerClick = () => {
        this.setState({ isOpenBurger: !this.state.isOpenBurger });
    };

    render() {
        const { isOpenBurger } = this.state;
        return (
            <Navbar color="dark" dark expand="md" fixed="top">
                <NavbarBrand href="/">Notice Board</NavbarBrand>
                <NavbarToggler onClick={this.handleBurgerClick} />
                <Collapse isOpen={isOpenBurger} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink disabled href="/components/">
                                        Daily Deals
                                    </NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink disabled href="/create/">
                                        Create Application
                                    </NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Button href="/account/" color="dark">
                        My profile
                    </Button>
                    <Button onClick={this.onLogoutClick} color="dark">
                        Log out
                    </Button>
                </Collapse>
            </Navbar>
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
