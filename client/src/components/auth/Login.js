import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import { Helmet } from 'react-helmet'

import LoadingSpinner from '../layout/LoadingSpinner'

import { Form, Input, Container, Header, Message, Divider } from 'semantic-ui-react'

import { Redirect } from 'react-router'

import { loginUser } from '../../actions/auth'
import { connect } from 'react-redux'

const Login = ({ loading, isAuthenticated, loginUser }) => {

  const firstRender = useRef(true)

  useLayoutEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false
      return
    }
  })

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

    if (firstRender.current === false && showError === false) {
      loginUser(formData)
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return !loading ? (
    <Container style={{ height: '100%' }}>

      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to Fitty"></meta>
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

      <Divider hidden />

      <Header as='h1'>Login</Header>

      <Divider hidden />

      <Form>
        <Form.Field
          control={Input}
          type='text'
          label='Username'
          placeholder='Username'
          name='username'
          onChange={onChange}
          width={7}
        />

        <Form.Field
          control={Input}
          type='password'
          label='Password'
          placeholder='Password'
          name='password'
          onChange={onChange}
          width={7}
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
