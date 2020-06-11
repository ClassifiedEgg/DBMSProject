import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Container, Card, Grid, Header, Pagination, Icon } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getAllWorkouts, deleteWorkout } from '../../actions/workout'

const Workouts = ({ allWorkouts, loading, getAllWorkouts, deleteWorkout }) => {
  useEffect(() => { getAllWorkouts() }, [])

  const [activePage, setActivePage] = useState(1)


  return (
    <Container fluid>
      <Grid columns={4} style={{ minHeight: '70vh' }}>
        {
          allWorkouts.map(({ workout: { workoutName, date, allExercises, _id } }, idx) => {
            if (idx >= (activePage - 1) * 4 && idx < activePage * 4) {
              return (
                <Grid.Column key={idx}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Grid columns={3}>
                          <Grid.Column width={11}>{workoutName}</Grid.Column>
                          <Grid.Column width={2}><Link to={`/workouts/edit/${_id}`}>
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
                                deleteWorkout(_id)
                                setActivePage(Math.ceil((allWorkouts.length - 1) / 4))
                              }}
                              name='trash alternate'
                              color='red' />
                          </Link>
                          </Grid.Column>
                        </Grid>
                      </Card.Header>
                      <Card.Meta>{date}</Card.Meta>
                      <Card.Description>
                        <Grid columns={2}>
                          <Grid.Row>
                            <Grid.Column width={10}><Header as='h3'>Exercise Name</Header></Grid.Column>
                            <Grid.Column width={4}><Header as='h3'>Reps</Header></Grid.Column>
                          </Grid.Row>
                          {
                            allExercises.map(({ name, reps }, idx) => (
                              <Grid.Row key={idx}>
                                <Grid.Column style={{ fontSize: '1.5rem' }}> {name}</Grid.Column>
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
          })
        }
      </Grid>
      <Grid textAlign='center'>
        <Pagination
          boundaryRange={0}
          activePage={activePage}
          siblingRange={1}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={(e, { activePage }) => (setActivePage(activePage))}
          totalPages={Math.ceil(allWorkouts.length / 4)}
        />
      </Grid>
    </Container>
  )
}

Workouts.propTypes = {
  allWorkouts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllWorkouts: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  allWorkouts: state.workouts.allWorkouts,
  loading: state.workouts.loding
})

export default connect(mapStateToProps, { getAllWorkouts, deleteWorkout })(Workouts)
