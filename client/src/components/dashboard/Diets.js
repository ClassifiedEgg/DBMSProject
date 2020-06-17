import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { escapeRegExp, filter } from 'lodash'

import DietCard from './DietCard'
import LoadingSpinner from '../layout/LoadingSpinner'

import { Container, Grid, Pagination, Search, Header } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getAllDiets, deleteDiet } from '../../actions/diets'

const Diets = ({ allDiets, loading, getAllDiets, deleteDiet }) => {
  useEffect(() => { getAllDiets() }, [])

  useEffect(() => setDisplayDiets([...allDiets]), [allDiets])

  const [activePage, setActivePage] = useState(1)

  const [displayDiets, setDisplayDiets] = useState([])

  const [searchLoading, setSearchLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearchLoading(true)

    const re = new RegExp(escapeRegExp(search), 'i')
    const isMatch = (result) => re.test(result.dietName)

    setDisplayDiets(filter(allDiets, isMatch))
    setSearchLoading(false)
  }, [search, allDiets])

  return !loading && allDiets !== null ? (
    <Container fluid>
      <Grid centered={true}>
        <Search
          resultRenderer={() => null}
          showNoResults={false}
          loading={searchLoading}
          onSearchChange={(e, { value }) => setSearch(value)}
          value={search}
          placeholder='Search for Diets'
          style={{ padding: '1% 0%' }}
        />
      </Grid>
      <Grid columns={4} style={{ minHeight: '60vh' }}>
        {
          displayDiets.length > 0 ?
            displayDiets.map(({ dietName, date, allMeals, _id }, idx) => {
              if (idx >= (activePage - 1) * 4 && idx < activePage * 4) {
                return <DietCard
                  key={idx}
                  dietName={dietName}
                  date={date}
                  allMeals={allMeals}
                  id={_id}
                  noOfPages={displayDiets.length}
                  deleteDiet={deleteDiet}
                  setActivePage={setActivePage}
                />
              } else {
                return
              }
            })
            :
            <Grid columns={1} verticalAlign='middle' centered={true}>
              <Grid.Column>
                <Header as='h3' textAlign='center'>No diets to show :(</Header>
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
          totalPages={Math.ceil(displayDiets.length / 4)}
        />
      </Grid>
    </Container>
  ) : <LoadingSpinner />
}

Diets.propTypes = {
  allDiets: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getAllDiets: PropTypes.func.isRequired,
  deleteDiet: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  allDiets: state.diets.allDiets,
  loading: state.diets.loading
})

export default connect(mapStateToProps, { getAllDiets, deleteDiet })(Diets)
