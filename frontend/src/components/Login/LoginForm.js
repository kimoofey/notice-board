import React from 'react';
import {Formik} from 'formik';
import {Alert, Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import * as Yup from 'yup';

const SignupForm = () => {
    return (
        <Formik
            initialValues={{firstName: '', lastName: '', email: ''}}
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
                // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
                    .min(8, 'Password is too short - should be 8 chars minimum')
                    .required('Required'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <Container className="text-left">
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup className="">
                            <Label for="firstName">First Name</Label>
                            <Input className="form-control" name="firstName" {...formik.getFieldProps('firstName')}/>
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <Alert color="danger">{formik.errors.firstName}</Alert>
                            ) : null}
                        </FormGroup>
                        <FormGroup className="">
                            <Label for="lastName">Last Name</Label>
                            <Input className="form-control" name="lastName" {...formik.getFieldProps('lastName')}/>
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <Alert color="danger">{formik.errors.lastName}</Alert>
                            ) : null}
                        </FormGroup>
                        <FormGroup className="">
                            <Label for="email">Email Address</Label>
                            <Input className="form-control" name="email" {...formik.getFieldProps('email')}/>
                            {formik.touched.email && formik.errors.email ? (
                                <Alert color="danger">{formik.errors.email}</Alert>
                            ) : null}
                        </FormGroup>
                        <FormGroup className="">
                            <Label for="password">Password</Label>
                            <Input className="form-control" name="password" {...formik.getFieldProps('password')}/>
                            {formik.touched.password && formik.errors.password ? (
                                <Alert color="danger">{formik.errors.password}</Alert>
                            ) : null}
                        </FormGroup>
                        <Button type="submit" color="primary">Submit</Button>
                    </Form>
                </Container>
            )}
        </Formik>
    );
};

export default SignupForm;