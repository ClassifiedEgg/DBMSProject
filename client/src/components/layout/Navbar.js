import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Button, Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/auth'

const Navbar = ({ isAuthenticated, logoutUser, username }) => {
  return (
    <Menu size='large' borderless>

      <Menu.Item>
        {
          isAuthenticated ? (
            <Link to='/dashboard' style={{ color: '#6435c9' }} >
              <Icon name='weight' size='big' /> Fitty
            </Link>
          ) : (
              <Link to='/' style={{ color: '#6435c9' }} >
                <Icon name='weight' size='big' /> Fitty
              </Link>
            )
        }
      </Menu.Item>

      {isAuthenticated ?

        (<Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/workouts/new' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='violet'>
                New Workout
            </Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to='/diets/new' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='violet'>
                New Diet
            </Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link>
              <Button color='violet' onClick={() => logoutUser()}>Sign Out</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>) :

        (<Menu.Menu position='right'>
          <Menu.Item>
            <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='violet'>
                Sign In
            </Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to='/register' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color='violet'>
                Sign Up
            </Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>)
      }

    </Menu>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user,
})

export default connect(mapStateToProps, { logoutUser })(Navbar)
