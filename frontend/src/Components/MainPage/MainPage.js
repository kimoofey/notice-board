import React, {Component} from "react";
import {
    Button,
    Container,
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from "reactstrap";
import './MainPage.css'

export default class MainPage extends Component {
    state = {users: []};

    componentDidMount() {
        // fetch('/users')
        //     .then(res => res.json())
        //     .then(users => this.setState({users}));
    }

    render() {
        return (
            <Container>
                <Col md="6" className="bg-secondary">MOTO</Col>
                <Row className="bg-secondary categories">
                    <p>Categories</p>
                    <Col md="4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up
                                    the
                                    bulk of the card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up
                                    the
                                    bulk of the card's content.</p>
                                <a href="#" className="card-link">Card link</a>
                                <a href="#" className="card-link">Another link</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <aside>
                    <div className="popular-items">POPULAR ITEMS</div>
                    <div className="ad">AD</div>
                </aside>
                <Button color="danger">push me</Button>
                <h1>Users</h1>
                {/*{this.state.users.map(user =>*/}
                {/*    <div key={user.id}>{user.username}</div>*/}
                {/*)}*/}
                <footer></footer>
            </Container>
        );
    }
}