import React, { Fragment, useEffect } from 'react';

import { Router, Route, Switch } from "react-router-dom";
import history from './history'

import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'

import setAuthToken from './utils/setAuthToken'
import NewWorkout from './components/workout/NewWorkout';
import EditWorkout from './components/workout/EditWorkout';
import NewDiet from './components/Diets/NewDiet';
import EditDiet from './components/Diets/EditDiet';
import Landing from './components/layout/Landing';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router history={history}>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/workouts/new' component={NewWorkout} />
            <Route exact path='/diets/new' component={NewDiet} />
            <Route exact path='/workouts/edit/:wkId' component={EditWorkout} />
            <Route exact path='/diets/edit/:dietId' component={EditDiet} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
