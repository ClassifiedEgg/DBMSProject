import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { escapeRegExp, filter } from 'lodash'
import { Helmet } from 'react-helmet'

import WorkoutCard from './WorkoutCard'
import LoadingSpinner from '../layout/LoadingSpinner'

import { Container, Grid, Pagination, Search, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getAllWorkouts, deleteWorkout } from '../../actions/workout'

const Workouts = ({ allWorkouts, loading, getAllWorkouts, deleteWorkout }) => {
  useEffect(() => { getAllWorkouts() }, [])

  useEffect(() => setDisplayWorkouts([...allWorkouts]), [allWorkouts])

  const [activePage, setActivePage] = useState(1)

  const [displayWorkouts, setDisplayWorkouts] = useState([])

  const [searchLoading, setSearchLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearchLoading(true)

    const re = new RegExp(escapeRegExp(search), 'i')
    const isMatch = (result) => re.test(result.workoutName)

    setDisplayWorkouts(filter(allWorkouts, isMatch))
    setSearchLoading(false)
  }, [search, allWorkouts])

  return !loading && allWorkouts !== null ? (
    <Container fluid>

      <Helmet>
        <title>Dashboard - Workouts</title>
        <meta name="description" content="Showing all workouts"></meta>
      </Helmet>

      <Grid centered={true}>
        <Search
          resultRenderer={() => null}
          showNoResults={false}
          loading={searchLoading}
          onSearchChange={(e, { value }) => setSearch(value)}
          value={search}
          placeholder='Search for Workouts'
          style={{ padding: '1% 0%' }}
        />
      </Grid>

      <Grid columns={4} style={{ minHeight: '60vh' }}>
        {
          displayWorkouts.length > 0 ?
            displayWorkouts.map(({ workoutName, date, allExercises, _id }, idx) => {
              if (idx >= (activePage - 1) * 4 && idx < activePage * 4) {
                return (
                  <WorkoutCard
                    key={idx}
                    id={_id}
                    date={date}
                    workoutName={workoutName}
                    exercises={allExercises}
                    noOfPages={displayWorkouts.length}
                    deleteWorkout={deleteWorkout}
                    setActivePage={setActivePage}
                  />
                )
              } else {
                return null
              }
            })
            :
            <Grid columns={1} verticalAlign='middle' centered={true}>
              <Grid.Column>
                <Header as='h3' textAlign='center'>No workouts to show :(</Header>
              </Grid.Column>
            </Grid>
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
          totalPages={Math.ceil(displayWorkouts.length / 4)}
        />
      </Grid>
    </Container>
  ) : <LoadingSpinner />
}

Workouts.propTypes = {
  allWorkouts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllWorkouts: PropTypes.func.isRequired,
  deleteWorkout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  allWorkouts: state.workouts.allWorkouts,
  loading: state.workouts.loading
})

export default connect(mapStateToProps, { getAllWorkouts, deleteWorkout })(Workouts)
