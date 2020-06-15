import React from 'react'
import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'

const ProtectedRoute = ({ isAuthenticated, loading, component: Component, ...rest }) =>
  (
    <Route {...rest} render={(props) => (
      (isAuthenticated && !loading) ?
        (<Component {...props} />) :
        (<Redirect to='/login' />)
    )}
    />
  )

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, {})(ProtectedRoute)
