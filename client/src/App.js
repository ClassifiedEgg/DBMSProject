import React, { Fragment, useEffect } from 'react';
import './App.css'

import { Router, Route, Switch } from "react-router-dom";
import history from './history'

import ProtectedRoute from './components/routing/ProtectedRoute'
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import NewWorkout from './components/workout/NewWorkout';
import EditWorkout from './components/workout/EditWorkout';
import NewDiet from './components/Diets/NewDiet';
import EditDiet from './components/Diets/EditDiet';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';


import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'

import setAuthToken from './utils/setAuthToken'

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
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/workouts/new' component={NewWorkout} />
            <ProtectedRoute exact path='/diets/new' component={NewDiet} />
            <ProtectedRoute exact path='/workouts/edit/:wkId' component={EditWorkout} />
            <ProtectedRoute exact path='/diets/edit/:dietId' component={EditDiet} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
