import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Container, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { loginUser } from '../../actions/auth'

const Login = ({ loading, isAuthenticated, loginUser }) => {

  const renders = useRef(0)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  console.log(formData)
  console.log(renders)

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    loginUser(formData);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return loading ? ('Loading') : (
    <Container>

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
  )
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
