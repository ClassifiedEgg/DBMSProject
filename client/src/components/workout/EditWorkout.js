import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import LoadingSpinner from '../layout/LoadingSpinner'

import { Container, Header, Grid, Input, Icon, Button } from 'semantic-ui-react'

import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { editWorkout, getWorkout } from '../../actions/workout'

const NewWorkout = ({ editWorkout, getWorkout, currWorkout, loading }) => {
  const { wkId } = useParams()

  const newExercise = { name: "", reps: "" }
  const [allExercises, setAllExercises] = useState([{ ...newExercise }])
  const [workoutName, setWorkoutName] = useState('')

  useEffect(() => {
    getWorkout(wkId)
  }, [wkId])

  useEffect(() => {
    if (loading === false && currWorkout !== null) {
      setWorkoutName(currWorkout.workoutName)
      setAllExercises(currWorkout.allExercises.map(({ name, reps }) => ({ name, reps })))
    }
  }, [currWorkout])

  const addNewExercise = () => (setAllExercises([...allExercises, { ...newExercise }]))

  const onExerciseChange = (e, ind) => {
    const updatedExercies = [...allExercises]
    updatedExercies[ind][e.target.name] = e.target.value
    setAllExercises(updatedExercies)
  }

  const deleteExercise = (e, delInd) => {
    let updatedExercies = [...allExercises]
    updatedExercies = updatedExercies.filter((el, ind) => ind !== delInd)
    setAllExercises(updatedExercies)
  }

  const onSubmit = (e) => {
    for (const { name, reps } of allExercises) {
      if (name.trim() === "" || reps.toString().trim() === "") {
        console.log('Invalid input')
        return
      }

      else if (reps.toString().trim() < 1) {
        console.log('Please enter more than or equal to 1 rep')
        return
      }

      else if (workoutName.trim() === "") {
        console.log('Please enter a name for your workout')
        return
      }
    }

    editWorkout({ workoutName, allExercises }, wkId)
  }

  return loading === false && currWorkout !== null ?(
    <Container>
      <Header as='h1' textAlign='center' >Add New Workout</Header>

      <Grid style={{ padding: '0% 15%' }}>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column>
            <Input transparent placeholder='Workout Name..' fluid size='massive' value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
          </Grid.Column>
        </Grid.Row>

        {
          allExercises.map(({ name, reps }, ind) => {
            return (
              <Grid.Row columns={4} key={ind}>
                <Grid.Column width={2} />
                <Grid.Column width={6}>
                  <Input
                    transparent
                    fluid
                    placeholder='Exercise'
                    size='huge'
                    name='name'
                    value={allExercises[ind].name}
                    onMouseEnter={(e) => e.target.parentElement.classList.add('focus')}
                    onMouseLeave={(e) => e.target.parentElement.classList.remove('focus')}
                    onChange={(e) => onExerciseChange(e, ind)} />
                </Grid.Column>
                <Grid.Column width={4} floated='left'>
                  <Input
                    transparent
                    fluid
                    placeholder='Reps'
                    size='huge'
                    name='reps'
                    type='number'
                    value={allExercises[ind].reps}
                    onMouseEnter={(e) => e.target.parentElement.classList.add('focus')}
                    onMouseLeave={(e) => e.target.parentElement.classList.remove('focus')}
                    onChange={(e) => onExerciseChange(e, ind)} />
                </Grid.Column>
                <Grid.Column width={4} floated='right' verticalAlign='middle' textAlign='left'>
                  <Icon
                    style={allExercises.length !== 1 ? { cursor: 'pointer' } : null}
                    name='trash alternate'
                    disabled={allExercises.length === 1}
                    size='big'
                    color='teal'
                    onClick={(e) => deleteExercise(e, ind)} />
                </Grid.Column>
              </Grid.Row>
            )
          })
        }

        <Grid.Row
          columns={4}
          style={{ opacity: '50%', transition: '0.5s' }}
          onMouseEnter={(e) => e.target.style.opacity = 0.85}
          onMouseLeave={(e) => e.target.style.opacity = 0.5}>
          <Grid.Column width={2} />
          <Grid.Column width={6}>
            <Input transparent disabled placeholder='Exercise' fluid size='huge' />
          </Grid.Column>
          <Grid.Column width={4} floated='left'>
            <Input transparent disabled placeholder='Reps' fluid size='huge' />
          </Grid.Column>
          <Grid.Column width={4} floated='right' verticalAlign='middle' textAlign='left'>
            <Icon
              style={{ cursor: 'pointer' }}
              name='plus'
              size='big'
              color='grey'
              onClick={addNewExercise} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column textAlign='left'>
            <Button content='Edit Workout' icon='th list' labelPosition='right' color='green' onClick={onSubmit} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
  ) : <LoadingSpinner />
}

NewWorkout.propTypes = {
  editWorkout: PropTypes.func.isRequired,
  getWorkout: PropTypes.func.isRequired,
  currWorkout: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  currWorkout: state.workouts.workout,
  loading: state.workouts.loading
})

export default connect(mapStateToProps, { editWorkout, getWorkout })(NewWorkout)
