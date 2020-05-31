import React, { Component } from "react"
import * as Yup from "yup"
import {
    Alert,
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons"
import { Link, withRouter } from "react-router-dom"
import { Formik } from "formik"
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { registerUser } from "../../actions/authActions"
import './RegisterForm.css';

class Register extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/account');
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
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
                                        "Password is too short - should be 8 chars minimum",
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
                                    this.props.history,
                                )
                                setSubmitting(false);
                            }}
                        >
                            {(formik) => (
                                <Container className="text-left">
                                    <Form onSubmit={formik.handleSubmit}>
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
                                        <h3>Register</h3>
                                        <p>
                                            Already have an account?{" "}
                                            <Link to="/login">Login</Link>
                                        </p>
                                        <FormGroup className="">
                                            <Label for="firstName">
                                                First Name
                                            </Label>
                                            <Input
                                                className="form-control"
                                                name="firstName"
                                                {...formik.getFieldProps(
                                                    "firstName",
                                                )}
                                            />
                                            {formik.touched.firstName &&
                                            formik.errors.firstName ? (
                                                <Alert color="danger">
                                                    {formik.errors.firstName}
                                                </Alert>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="">
                                            <Label for="lastName">
                                                Last Name
                                            </Label>
                                            <Input
                                                className="form-control"
                                                name="lastName"
                                                {...formik.getFieldProps(
                                                    "lastName",
                                                )}
                                            />
                                            {formik.touched.lastName &&
                                            formik.errors.lastName ? (
                                                <Alert color="danger">
                                                    {formik.errors.lastName}
                                                </Alert>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="">
                                            <Label for="email">Email</Label>
                                            <Input
                                                className="form-control"
                                                name="email"
                                                {...formik.getFieldProps(
                                                    "email",
                                                )}
                                            />
                                            {formik.touched.email &&
                                            formik.errors.email ? (
                                                <Alert color="danger">
                                                    {formik.errors.email}
                                                </Alert>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="">
                                            <Label for="password">
                                                Password
                                            </Label>
                                            <Input
                                                className="form-control"
                                                name="password"
                                                type="password"
                                                {...formik.getFieldProps(
                                                    "password",
                                                )}
                                            />
                                            {formik.touched.password &&
                                            formik.errors.password ? (
                                                <Alert color="danger">
                                                    {formik.errors.password}
                                                </Alert>
                                            ) : null}
                                        </FormGroup>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                        <Link to="/login">
                                            <Button color="link">Cancel</Button>
                                        </Link>
                                    </Form>
                                </Container>
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
export default connect(mapStateToProps, { registerUser })(withRouter(Register))
