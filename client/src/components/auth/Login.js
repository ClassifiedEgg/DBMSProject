import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'

import LoadingSpinner from '../layout/LoadingSpinner'

import { Form, Input, Container, Header, Message } from 'semantic-ui-react'

import { Redirect } from 'react-router'

import { loginUser } from '../../actions/auth'
import { connect } from 'react-redux'

const Login = ({ loading, isAuthenticated, loginUser }) => {

  const [errorList, setErrorList] = useState([])
  const [showError, setShowError] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (errorList.length > 0) {
      setShowError(true)
    } else {
      setShowError(false)
      loginUser(formData)
    }
  }, [errorList])

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    setErrorList([])

    if (validator.isEmpty(formData.username)) {
      setErrorList(arr => [...arr, 'Please enter your username'])
    }
    if (validator.isEmpty(formData.password)) {
      setErrorList(arr => [...arr, 'Please enter your password'])
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return !loading ? (
    <Container>

      {showError ?
        <Message
          error
          header='There was some errors with your submission'
          list={errorList}
        />
        :
        null
      }

      <Header as='h1'>Login</Header>

      <Form>
        <Form.Field
          control={Input}
          type='text'
          label='Username'
          placeholder='Username'
          name='username'
          onChange={onChange}
          width='nine'
        />

        <Form.Field
          control={Input}
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          onChange={onChange}
          width='nine'
        />

        <Form.Button
          content='Login'
          color='green'
          onClick={onSubmit}
        />
      </Form>
    </Container>
  ) : <LoadingSpinner />
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, { loginUser })(Login)
