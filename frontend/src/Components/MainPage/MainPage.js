import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle
} from "reactstrap";
import {faFacebookSquare, faInstagramSquare, faTwitterSquare} from "@fortawesome/free-brands-svg-icons";
import {faUserShield, faHeadset, faLemon} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './MainPage.css'
import CustomCarousel from "../Carousel/Carousel";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section>
                <Container>
                    <Col md="6" className="">MOTO</Col>
                    <Row className="home-container">
                        <Col md="1" className="d-flex align-items-center justify-content-center flex-column">
                            <FontAwesomeIcon size="lg" className="social-icon" icon={faFacebookSquare}/>
                            <FontAwesomeIcon size="lg" className="social-icon" icon={faTwitterSquare}/>
                            <FontAwesomeIcon size="lg" className="social-icon" icon={faInstagramSquare}/>
                        </Col>
                        <Col md="5" className="d-flex align-items-center justify-content-center flex-column">
                            <div className="">
                                <h1>Notice Board</h1>
                                <Button onClick={this.props.handleStartButton} color="danger">Start now</Button>
                            </div>
                            <div>
                                <FontAwesomeIcon size="lg" className="title-icon" icon={faUserShield}/>
                                <FontAwesomeIcon size="lg" className="title-icon" icon={faLemon}/>
                                <FontAwesomeIcon size="lg" className="title-icon" icon={faHeadset}/>
                            </div>
                        </Col>
                        <Col md="6" className="d-flex align-items-center justify-content-center">
                            <CustomCarousel/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <h2>About Us</h2>
                    <Row className="home-container">
                        <Col md="6" className="d-flex align-items-center justify-content-center">
                            <img src="https://via.placeholder.com/350?text=Pretty-image" alt=""/>
                        </Col>
                        <Col md="6" className="d-flex align-items-center">
                            <div className="text-justify">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus faucibus orci,
                                    quis tristique mi ullamcorper a. Curabitur risus odio, varius non ante at, aliquam
                                    luctus nibh. Duis at consectetur ipsum, nec tincidunt elit. Sed feugiat consequat
                                    sem in malesuada. Nunc eu turpis eu nisl molestie pellentesque ac sed ligula.
                                    Mauris porta iaculis mi, et volutpat nisl tempor et. Integer a felis venenatis,
                                    fermentum tellus eget, venenatis lacus. Donec at mattis nisi. Sed sed ipsum
                                    fermentum,
                                    mollis libero vel, sodales sapien. Quisque sem turpis, imperdiet nec facilisis sit
                                    amet,
                                    sollicitudin sed lacus.</p>
                                <Button color="danger">Learn More</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <h2>Categories</h2>
                    <Row className="home-container">
                        <Col md="4">
                            <Card className="categories-card border-0">
                                <CardImg top width="100%" src="https://via.placeholder.com/250?text=Pretty-image"
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <Button>Search</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="categories-card border-0">
                                <CardImg top width="100%" src="https://via.placeholder.com/250?text=Pretty-image"
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <Button>Search</Button>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card className="categories-card border-0">
                                <CardImg top width="100%" src="https://via.placeholder.com/250?text=Pretty-image"
                                         alt="Card image cap"/>
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <Button>Search</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}

MainPage.propTypes = {
    handleStartButton: PropTypes.func.isRequired
};