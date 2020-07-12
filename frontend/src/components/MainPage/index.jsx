import React, { Component } from 'react';
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
                <div className="container-fluid">
                    <div className="col-md-6">
                        <h2>Люди – людям</h2>
                    </div>
                    <div className="row home-container">
                        <div className="col-md-1 d-flex align-items-center justify-content-center flex-column">
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
                        </div>
                        <div className="col-md-5 d-flex align-items-center justify-content-center flex-column">
                            <div className="">
                                <h1>Notice Board</h1>
                                <button type="button" id="home-button">
                                    Start now
                                </button>
                                <Link to="/login">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                    >
                                        Login
                                    </button>
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
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <CustomCarousel />
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <h2>About Us</h2>
                    <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-5">
                            <img
                                src="https://via.placeholder.com/350?text=Pretty-image"
                                alt=""
                            />
                        </div>
                        <div className="col-md-5">
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
                                <button type="button" id="more-button">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <h2>Categories</h2>
                    <div className="row home-container d-flex align-items-center justify-content-center">
                        {!this.props.categories.isLoading ? (
                            this.props.categories.categories.map((item) => (
                                <div className="col-md-3" key={item.id}>
                                    <div className="card categories-card border-0">
                                        <img
                                            src={item.img}
                                            alt="Card image cap"
                                            className="card-img-top"
                                        />
                                        <div className="card-body">
                                            <div className="card-title">
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                    </div>
                </div>
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
