import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Workouts from './Workouts'
import Diets from './Diets'

import { Container, Header, Grid, Button } from 'semantic-ui-react'

const Dashboard = props => {
  const [activeTab, setActiveTab] = useState('workouts')
  return (
    <Container>
      <Header as='h1' textAlign='center'>Dashbaord</Header>
      <Grid centered columns={2}>
        <Grid.Column textAlign='center'>
          <Button
            style={activeTab !== 'workouts' ? { background: 'none' } : null}
            content='Workouts'
            active={activeTab === 'workouts'}
            onClick={(e) => setActiveTab('workouts')}
          />
        </Grid.Column>

        <Grid.Column textAlign='center'>
          <Button
            style={activeTab !== 'diets' ? { background: 'none' } : null}
            content='Diets'
            onClick={(e) => setActiveTab('diets')}
          />
        </Grid.Column>
      </Grid>

      {activeTab === 'workouts' ? <Workouts /> : <Diets />}

    </Container>
  )
}

Dashboard.propTypes = {

}

export default Dashboard
