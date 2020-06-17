import React, { useState, useEffect } from 'react'

import { Message, Transition, Grid } from 'semantic-ui-react'

import { connect } from 'react-redux'

const Alert = ({ message, color, alertId }) => {

  useEffect(() => (setVisible(true)), [alertId])

  const [visible, setVisible] = useState(false)

  return message !== "" ? (
    <Grid style={{ position: 'absolute', zIndex: '2', left: '0', right: '0' }} centered={true}>
      <Transition
        visible={visible}
        animation='fade'
        duration={1000}
        transitionOnMount
        unmountOnHide
        onShow={() => setTimeout(() => setVisible(false), 400)}>
        <Message color={color} style={{ marginTop: '1%' }}>
          <Message.Header>{message}</Message.Header>
        </Message>
      </Transition>
    </Grid>
  ) : null
}

Alert.propTypes = {

}

const mapStateToProps = state => ({
  color: state.alerts.color,
  message: state.alerts.message,
  alertId: state.alerts.alertId
})

export default connect(mapStateToProps, {})(Alert)
