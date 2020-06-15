import React from 'react'
import Moment from 'react-moment'

import { Grid, Icon, Card, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const WorkoutCard = ({ id, date, mainText, list, deleteWorkout, setActivePage, noOfPages }) => {
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>
            <Grid columns={3}>
              <Grid.Column width={11}>{mainText}</Grid.Column>
              <Grid.Column width={2}><Link to={`/workouts/edit/${id}`}>
                <Icon
                  style={{ opacity: '0.5' }}
                  onMouseEnter={(e) => e.target.style.opacity = 0.95}
                  onMouseLeave={(e) => e.target.style.opacity = 0.5}
                  name='edit'
                  color='blue' />
              </Link>
              </Grid.Column>
              <Grid.Column width={2}><Link>
                <Icon
                  style={{ opacity: '0.5' }}
                  onMouseEnter={(e) => e.target.style.opacity = 0.85}
                  onMouseLeave={(e) => e.target.style.opacity = 0.5}
                  onClick={() => {
                    deleteWorkout(id)
                    setActivePage(Math.ceil((noOfPages - 1) / 4) === 0 ? 1 : Math.ceil((noOfPages - 1) / 4))
                  }}
                  name='trash alternate'
                  color='red' />
              </Link>
              </Grid.Column>
            </Grid>
          </Card.Header>
          <Card.Meta>Made on <Moment format='MMMM Do YYYY'>{date}</Moment></Card.Meta>
          <Card.Description>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={10}><Header as='h3'>Exercise Name</Header></Grid.Column>
                <Grid.Column width={4}><Header as='h3'>Reps</Header></Grid.Column>
              </Grid.Row>
              {
                list.map(({ name, reps }, idxList) => (
                  <Grid.Row key={idxList}>
                    <Grid.Column style={{ fontSize: '1.5rem' }}>{name}</Grid.Column>
                    <Grid.Column textAlign='center' style={{ fontSize: '1.5rem' }}>x{reps}</Grid.Column>
                  </Grid.Row>
                ))
              }
            </Grid>
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default WorkoutCard
