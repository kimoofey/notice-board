import React, { Component } from 'react';
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    Col,
    Container,
    Row,
    Spinner,
} from 'reactstrap';
import {
    faFacebook,
    faInstagram,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
    faHeadset,
    faLemon,
    faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MainPage.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomCarousel from '../Carousel';
import { fetchCategories } from '../../actions/CategoriesActions';

class MainPage extends Component {
    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        return (
            <section>
                <Container className="title" fluid>
                    <Col md="6" className="">
                        <h2>Люди – людям</h2>
                    </Col>
                    <Row className="home-container">
                        <Col
                            md="1"
                            className="d-flex align-items-center justify-content-center flex-column"
                        >
                            <FontAwesomeIcon
                                size="lg"
                                className="social-icon"
                                icon={faFacebook}
                            />
                            <FontAwesomeIcon
                                size="lg"
                                className="social-icon"
                                icon={faTwitter}
                            />
                            <FontAwesomeIcon
                                size="lg"
                                className="social-icon"
                                icon={faInstagram}
                            />
                        </Col>
                        <Col
                            md="5"
                            className="d-flex align-items-center justify-content-center flex-column"
                        >
                            <div className="">
                                <h1>Notice Board</h1>
                                <Button id="home-button">Start now</Button>
                                <Link to="/login">
                                    <Button color="danger">Login</Button>
                                </Link>
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    size="lg"
                                    className="title-icon"
                                    icon={faUserShield}
                                />
                                <FontAwesomeIcon
                                    size="lg"
                                    className="title-icon"
                                    icon={faLemon}
                                />
                                <FontAwesomeIcon
                                    size="lg"
                                    className="title-icon"
                                    icon={faHeadset}
                                />
                            </div>
                        </Col>
                        <Col
                            md="6"
                            className="d-flex align-items-center justify-content-center"
                        >
                            <CustomCarousel />
                        </Col>
                    </Row>
                </Container>
                <Container className="about" fluid>
                    <h2>About Us</h2>
                    <Row className="home-container d-flex align-items-center justify-content-center">
                        <Col md="5">
                            <img
                                src="https://via.placeholder.com/350?text=Pretty-image"
                                alt=""
                            />
                        </Col>
                        <Col md="5">
                            <div className="text-justify">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nulla maximus faucibus
                                    orci, quis tristique mi ullamcorper a.
                                    Curabitur risus odio, varius non ante at,
                                    aliquam luctus nibh. Duis at consectetur
                                    ipsum, nec tincidunt elit. Sed feugiat
                                    consequat sem in malesuada. Nunc eu turpis
                                    eu nisl molestie pellentesque ac sed ligula.
                                    Mauris porta iaculis mi, et volutpat nisl
                                    tempor et. Integer a felis venenatis,
                                    fermentum tellus eget, venenatis lacus.
                                    Donec at mattis nisi. Sed sed ipsum
                                    fermentum, mollis libero vel, sodales
                                    sapien. Quisque sem turpis, imperdiet nec
                                    facilisis sit amet, sollicitudin sed lacus.
                                </p>
                                <Button id="more-button">Learn More</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="options" fluid>
                    <h2>Categories</h2>
                    <Row className="home-container d-flex align-items-center justify-content-center">
                        {!this.props.categories.isLoading ? (
                            this.props.categories.categories.map((item) => (
                                <Col md="3" key={item.id}>
                                    <Card className="categories-card border-0">
                                        <CardImg
                                            top
                                            width="100%"
                                            src={item.img}
                                            alt="Card image cap"
                                        />
                                        <CardBody>
                                            <CardTitle>{item.title}</CardTitle>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <Spinner id="spinner" type="grow" />
                        )}
                    </Row>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    categories: state.Categories,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

MainPage.propTypes = {
    // handleStartButton: PropTypes.func.isRequired
};
