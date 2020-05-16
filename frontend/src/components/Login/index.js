import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import * as Yup from "yup";
import {Alert, Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";
import {Formik} from "formik";
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/account');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/account");
        }
        if (this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <Formik
                            initialValues={{email: '', password: ''}}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('Required'),
                                password: Yup.string()
                                    .min(8, 'Password is too short - should be 8 chars minimum')
                                    .required('Required'),
                            })}
                            onSubmit={(values, {setSubmitting, ...acts}) => {
                                console.log(acts);
                                const userData = {
                                    email: values.email,
                                    password: values.password
                                };

                                this.props.loginUser(userData);
                                setSubmitting(false);
                            }}
                        >
                            {formik => (
                                <Container className="text-left">
                                    <Link to="/">
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon size="lg" className="social-icon"
                                                             icon={faLongArrowAltLeft}/>
                                            <p className="home-link">BACK TO HOME</p>
                                        </div>
                                    </Link>
                                    <h3>Login</h3>
                                    <Form onSubmit={formik.handleSubmit}>
                                        <FormGroup className="">
                                            <Label for="email">Email</Label>
                                            <Input className="form-control"
                                                   name="email" {...formik.getFieldProps('email')}/>
                                            {formik.touched.email && formik.errors.email ? (
                                                <Alert color="danger">{formik.errors.email}</Alert>
                                            ) : null}
                                        </FormGroup>
                                        <FormGroup className="">
                                            <Label for="password">Password</Label>
                                            <Input className="form-control" name="password"
                                                   type="password" {...formik.getFieldProps('password')}/>
                                            {formik.touched.password && formik.errors.password ? (
                                                <Alert color="danger">{formik.errors.password}</Alert>
                                            ) : null}
                                        </FormGroup>
                                        <Button type="submit" color="primary">Login</Button>
                                        <Link to="/register"><Button color="link">Register</Button></Link>
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

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    {loginUser}
)(Login);