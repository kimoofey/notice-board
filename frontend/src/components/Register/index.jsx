import React, { Component } from 'react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import './RegisterForm.css';

class Register extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/account');
        }
    }

    render() {
        return (
            <div className="container-fluid register--container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                password: '',
                            }}
                            validationSchema={Yup.object({
                                firstName: Yup.string()
                                    .max(15, 'Must be 15 characters or less')
                                    .required('Required'),
                                lastName: Yup.string()
                                    .max(20, 'Must be 20 characters or less')
                                    .required('Required'),
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
                                const newUser = {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    password: values.password,
                                };

                                this.props.registerUser(
                                    newUser,
                                    this.props.history
                                );
                                setSubmitting(false);
                            }}
                        >
                            {(formik) => (
                                <div className="container text-left">
                                    <form onSubmit={formik.handleSubmit}>
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
                                        <div className="text-center">
                                            <h3>Register</h3>
                                            <p>
                                                {'Already have an account? '}
                                                <Link to="/login">Login</Link>
                                            </p>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="firstName">
                                                First Name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="firstName"
                                                {...formik.getFieldProps(
                                                    'firstName'
                                                )}
                                                id="firstName"
                                            />
                                            {formik.touched.firstName &&
                                            formik.errors.firstName ? (
                                                <div className="alert alert-danger">
                                                    {formik.errors.firstName}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastName">
                                                Last Name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="lastName"
                                                {...formik.getFieldProps(
                                                    'lastName'
                                                )}
                                                id="lastName"
                                            />
                                            {formik.touched.lastName &&
                                            formik.errors.lastName ? (
                                                <div className="alert alert-danger">
                                                    {formik.errors.lastName}
                                                </div>
                                            ) : null}
                                        </div>
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
                                            className="btn btn-success"
                                        >
                                            Submit
                                        </button>
                                        <Link to="/login">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                Cancel
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
