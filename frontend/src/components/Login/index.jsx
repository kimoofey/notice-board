import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Formik } from 'formik';
import { loginUser } from '../../actions/authActions';
import './Login.css';

class Login extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/account');
        }
    }

    componentDidUpdate() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/account');
        }
        if (this.props.errors) {
            // catch errors
            // this.setState({
            //     errors: this.props.errors,
            // });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('Required'),
                                password: Yup.string()
                                    .min(
                                        8,
                                        'Password is too short - should be 8 chars minimum'
                                    )
                                    .required('Required'),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                const userData = {
                                    email: values.email,
                                    password: values.password,
                                };

                                this.props.loginUser(userData);
                                setSubmitting(false);
                            }}
                        >
                            {(formik) => (
                                <div className="container">
                                    <Link to="/">
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon
                                                size="lg"
                                                className="social-icon"
                                                icon={faLongArrowAltLeft}
                                            />
                                            <p className="home-link">
                                                BACK TO HOME
                                            </p>
                                        </div>
                                    </Link>
                                    <h3>Login</h3>
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                className="form-control"
                                                name="email"
                                                {...formik.getFieldProps(
                                                    'email'
                                                )}
                                                id="email"
                                            />
                                            {formik.touched.email &&
                                            formik.errors.email ? (
                                                <div className="alert alert-danger">
                                                    {formik.errors.email}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                className="form-control"
                                                name="password"
                                                type="password"
                                                {...formik.getFieldProps(
                                                    'password'
                                                )}
                                                id="password"
                                            />
                                            {formik.touched.password &&
                                            formik.errors.password ? (
                                                <div className="alert alert-danger">
                                                    {formik.errors.password}
                                                </div>
                                            ) : null}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Login
                                        </button>
                                        <Link to="/register">
                                            <button
                                                type="button"
                                                className="btn btn-link"
                                            >
                                                Register
                                            </button>
                                        </Link>
                                    </form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.objectOf(PropTypes.object).isRequired,
    errors: PropTypes.objectOf(PropTypes.object).isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});
export default connect(mapStateToProps, { loginUser })(Login);
