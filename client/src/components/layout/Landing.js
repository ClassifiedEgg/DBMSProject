import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { Container, Grid, Image, Header, Icon, Button } from 'semantic-ui-react'

import logo from '../../assets/fitness.svg'

import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = ({ isAuthenticated, loading }) => {

  if (!loading && isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <Helmet>
        <title>Fitty</title>
        <meta name="description" content="Fitty"></meta>
      </Helmet>

      <Container style={{ marginTop: '5%' }}>
        <Grid columns={2}>
          <Grid.Column style={{ paddingRight: '10%' }}>
            <Header as='h1' style={{ marginBottom: '5%', color: '#6435c9' }}>
              <Icon name='weight' size='massive' />
              <Header.Content style={{ fontSize: '4rem' }} >Fitty</Header.Content>
            </Header>
            <p style={{ fontSize: '1.6rem' }}>Always had ideas for your workouts and diets but never a place to keep them together?</p>
            <p style={{ fontSize: '1.6rem' }}>We got you covered now!</p>
            <p style={{ fontSize: '1.6rem' }}>Sign Up to start getting in shape :)</p>
            <Link to='/register'><Button color='violet'>Make an Accont</Button></Link>
          </Grid.Column>
          <Grid.Column>
            <Image src={logo} fluid />
          </Grid.Column>
        </Grid>
      </Container>
    </Fragment>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})

export default connect(mapStateToProps, {})(Landing)
