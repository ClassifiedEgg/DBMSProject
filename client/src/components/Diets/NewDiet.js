import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Container, Header, Grid, Input, Icon, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { makeNewDiet } from '../../actions/diets'

const NewDiet = ({ makeNewDiet }) => {
  const newMeal = { name: "", kcal: "" }
  const [allMeals, setAllMeals] = useState([{ ...newMeal }])
  const [dietName, setDietName] = useState('')

  const addNewMeal = () => (setAllMeals([...allMeals, { ...newMeal }]))

  const onMealChange = (e, ind) => {
    const updatedMeals = [...allMeals]
    updatedMeals[ind][e.target.name] = e.target.value
    setAllMeals(updatedMeals)
  }

  const deleteMeal = (e, delInd) => {
    let updatedMeals = [...allMeals]
    updatedMeals = updatedMeals.filter((el, ind) => ind !== delInd)
    setAllMeals(updatedMeals)
  }

  const onSubmit = (e) => {
    for (const { name, kcal } of allMeals) {
      if (name.trim() === "" || kcal.trim() === "") {
        console.log('Invalid input')
        return
      }

      else if (kcal.trim() < 1) {
        console.log('Please enter more than or equal to 1 kcal')
        return
      }

      else if (dietName.trim() === "") {
        console.log('Please enter a name for your workout')
        return
      }
    }

    makeNewDiet({ dietName, allMeals })
  }

  return (
    <Container>
      <Header as='h1' textAlign='center' >Add New Diet</Header>

      <Grid style={{ padding: '0% 15%' }}>
        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column>
            <Input transparent placeholder='Diet Name..' fluid size='massive' value={dietName} onChange={(e) => setDietName(e.target.value)} />
          </Grid.Column>
        </Grid.Row>

        {
          allMeals.map(({ name, kcal }, ind) => {
            return (
              <Grid.Row columns={4} key={ind}>
                <Grid.Column width={2} />
                <Grid.Column width={6}>
                  <Input
                    transparent
                    fluid
                    placeholder='Meal'
                    size='huge'
                    name='name'
                    value={allMeals[ind].name}
                    onMouseEnter={(e) => e.target.parentElement.classList.add('focus')}
                    onMouseLeave={(e) => e.target.parentElement.classList.remove('focus')}
                    onChange={(e) => onMealChange(e, ind)} />
                </Grid.Column>
                <Grid.Column width={4} floated='left'>
                  <Input
                    transparent
                    fluid
                    placeholder='kcal'
                    size='huge'
                    name='kcal'
                    type='number'
                    value={allMeals[ind].kcal}
                    onMouseEnter={(e) => e.target.parentElement.classList.add('focus')}
                    onMouseLeave={(e) => e.target.parentElement.classList.remove('focus')}
                    onChange={(e) => onMealChange(e, ind)} />
                </Grid.Column>
                <Grid.Column width={4} floated='right' verticalAlign='middle' textAlign='left'>
                  <Icon
                    style={allMeals.length !== 1 ? { cursor: 'pointer' } : null}
                    name='trash alternate'
                    disabled={allMeals.length === 1}
                    size='big'
                    color='teal'
                    onClick={(e) => deleteMeal(e, ind)} />
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
            <Input transparent disabled placeholder='Meal' fluid size='huge' />
          </Grid.Column>
          <Grid.Column width={4} floated='left'>
            <Input transparent disabled placeholder='kcal' fluid size='huge' />
          </Grid.Column>
          <Grid.Column width={4} floated='right' verticalAlign='middle' textAlign='left'>
            <Icon
              style={{ cursor: 'pointer' }}
              name='plus'
              size='big'
              color='grey'
              onClick={addNewMeal} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column width={2} />
          <Grid.Column textAlign='left'>
            <Button content='Create Diet' icon='food' labelPosition='right' color='green' onClick={onSubmit} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
  )
}

NewDiet.propTypes = {
  makeNewDiet: PropTypes.func.isRequired,
}

export default connect(null, { makeNewDiet })(NewDiet)
