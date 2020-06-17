import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import { Helmet } from 'react-helmet'

import { registerUser } from '../../actions/auth'

import { Form, Input, Container, Header, Select, Message, Transition, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const Register = ({ registerUser, isAuthenticated }) => {

  const genderOptions = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
  ]

  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorList, setErrorList] = useState([])
  const [showError, setShowError] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    height: "",
    weight: "",
    age: ""
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  useEffect(() => {
    if (errorList.length > 0) {
      setShowError(true)
    } else {
      setShowError(false)
      registerUser(formData)
    }
  }, [errorList])

  const onSubmit = e => {
    e.preventDefault()
    setErrorList([])

    if (!validator.isLength(formData.username, { max: 16 }) || !validator.isAlphanumeric(formData.username)) {
      formData.username.length > 16 ?
        setErrorList(arr => [...arr, 'Please make sure your Username is not longer than 16 characters']) :
        setErrorList(arr => [...arr, 'Please make sure your Username does not contain any special characters'])
    }

    if (!validator.isLength(formData.firstName, { max: 16 }) || !validator.isAlpha(formData.firstName)) {
      formData.firstName.length > 16 ?
        setErrorList(arr => [...arr, 'Please make sure your First Name is not longer than 16 characters']) :
        setErrorList(arr => [...arr, 'Please make sure your First Name only contains characters'])
    }

    if (!validator.isLength(formData.lastName, { max: 16 }) || !validator.isAlpha(formData.lastName)) {
      formData.lastName.length > 16 ?
        setErrorList(arr => [...arr, 'Please make sure your Last Name is not longer than 16 characters']) :
        setErrorList(arr => [...arr, 'Please make sure your Last Name only contains characters'])
    }

    if (!validator.isLength(formData.password, { max: 16 }) || !validator.isAlphanumeric(formData.password)) {
      formData.lastName.length > 16 ?
        setErrorList(arr => [...arr, 'Please make sure your Password is not longer than 16 characters']) :
        setErrorList(arr => [...arr, 'Please make sure your Password does not contain any special characters'])
    }

    if (validator.isEmpty(formData.height)) {
      setErrorList(arr => [...arr, 'Please enter your height'])
    }

    if (validator.isEmpty(formData.weight)) {
      setErrorList(arr => [...arr, 'Please enter your weight'])
    }

    if (validator.isEmpty(formData.age)) {
      setErrorList(arr => [...arr, 'Please enter your age'])
    }

    if (validator.isEmail(formData.gender)) {
      setErrorList(arr => [...arr, 'Please enter a valid gender'])
    }

    if (formData.password !== confirmPassword) {
      setErrorList(arr => [...arr, 'Please makes sure your passwords match'])
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Container>

      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register for Fitty"></meta>
      </Helmet>

      {showError ?
        <Message
          error
          header='There was some errors with your submission'
          list={errorList}
        />
        :
        null
      }

      <Header as='h1'>Register</Header>

      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            type='text'
            label='First name'
            placeholder='First name'
            name='firstName'
            onChange={(e) => onChange(e)}
          />
          <Form.Field
            control={Input}
            type='text'
            label='Last name'
            placeholder='Last name'
            name='lastName'
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            type='text'
            label='Username'
            placeholder='Username'
            name='username'
            onChange={(e) => onChange(e)}
          />
          <Form.Field
            control={Input}
            type='email'
            label='Email'
            placeholder='joe@schmoe.com'
            name='email'
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            type='number'
            label='Height'
            placeholder='Height (in cms)'
            name='height'
            onChange={(e) => onChange(e)}
          />
          <Form.Field
            control={Input}
            type='number'
            label='Weight'
            placeholder='Weight (in KGs)'
            name='weight'
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            type='number'
            label='Age'
            placeholder='Age'
            name='age'
            onChange={(e) => onChange(e)}
          />
          <Form.Field
            control={Select}
            options={genderOptions}
            label={{ children: 'Gender', htmlFor: 'form-select-control-gender' }}
            placeholder='Gender'
            search
            searchInput={{ id: 'form-select-control-gender' }}
            name='gender'
            onChange={(e, data) => {
              setFormData({ ...formData, gender: data.value })
            }}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            type='password'
            label='Password'
            placeholder='Password'
            name='password'
            onChange={(e) => onChange(e)}
          />
          <Form.Field
            control={Input}
            type='password'
            label='Confirm Password'
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Button
          content='Register'
          color='green'
          onClick={(e) => onSubmit(e)}
        />
      </Form>

      <Divider hidden />
    </Container>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { registerUser })(Register)
