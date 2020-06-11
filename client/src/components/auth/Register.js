import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { registerUser } from '../../actions/auth'

import { Form, Input, Container, Header, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

const Register = ({ registerUser, isAuthenticated }) => {

  const genderOptions = [
    { key: 'm', text: 'Male', value: 'Male' },
    { key: 'f', text: 'Female', value: 'Female' },
    { key: 'o', text: 'Other', value: 'Other' },
  ]

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    age: ""
  });

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    registerUser(formData);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Container>

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
          />
        </Form.Group>

        <Form.Button
          content='Register'
          color='green'
          onClick={(e) => onSubmit(e)}
        />
      </Form>
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
