import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Container, Card, Grid, Header, Pagination, Icon } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getAllDiets, deleteDiet } from '../../actions/diets'

const Diets = ({ allDiets, loading, getAllDiets, deleteDiet }) => {
  useEffect(() => { getAllDiets() }, [])

  const [activePage, setActivePage] = useState(1)

  return  (
    <Container fluid>
      <Grid columns={4} style={{ minHeight: '70vh' }}>
        {
          allDiets.map(({ diet: { dietName, date, allMeals, _id } }, idx) => {
            if (idx >= (activePage - 1) * 4 && idx < activePage * 4) {
              return (
                <Grid.Column>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Grid columns={3}>
                          <Grid.Column width={11}>{dietName}</Grid.Column>
                          <Grid.Column width={2}><Link to={`/diets/edit/${_id}`}>
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
                                deleteDiet(_id)
                                setActivePage(Math.ceil((allDiets.length - 1) / 4))
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
                            <Grid.Column width={10}><Header as='h3'>Meal</Header></Grid.Column>
                            <Grid.Column width={4}><Header as='h3'>kCal</Header></Grid.Column>
                          </Grid.Row>
                          {
                            allMeals.map(({ name, kcal }, idx) => (
                              <Grid.Row>
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
          totalPages={Math.ceil(allDiets.length / 4)}
        />
      </Grid>
    </Container>
  )
}

Diets.propTypes = {

}

const mapStateToProps = state => ({
  allDiets: state.diets.allDiets,
  loading: state.diets.loding
})

export default connect(mapStateToProps, { getAllDiets, deleteDiet })(Diets)
