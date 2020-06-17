import React from 'react'

import { Loader, Grid, Divider } from 'semantic-ui-react'

const LoadingSpinner = () => {
  return (
    <Grid.Column verticalAlign='middle'>
      <Divider hidden />
      <Loader active inline='centered' />
    </Grid.Column>
  )
}

export default LoadingSpinner