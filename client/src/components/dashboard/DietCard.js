import React from 'react'
import Moment from 'react-moment'

import { Grid, Icon, Card, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const DietCard = ({  id, date, dietName, allMeals, deleteDiet, setActivePage, noOfPages }) => {
  return (
    <Grid.Column>
      <Card>
        <Card.Content>
          <Card.Header>
            <Grid columns={3}>
              <Grid.Column width={11}>{dietName}</Grid.Column>
              <Grid.Column width={2}><Link to={`/diets/edit/${id}`}>
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
                    deleteDiet(id)
                    setActivePage(Math.ceil((noOfPages - 1) / 4))
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
                <Grid.Column width={10}><Header as='h3'>Meal</Header></Grid.Column>
                <Grid.Column width={4}><Header as='h3'>kCal</Header></Grid.Column>
              </Grid.Row>
              {
                allMeals.map(({ name, kcal }, idx) => (
                  <Grid.Row key={idx}>
                    <Grid.Column style={{ fontSize: '1.5rem' }}> {name}</Grid.Column>
                    <Grid.Column textAlign='center' style={{ fontSize: '1.5rem' }}>{kcal}</Grid.Column>
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

export default DietCard