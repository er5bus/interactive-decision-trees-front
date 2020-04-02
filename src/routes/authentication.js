import React from 'react'
import {  Route, Switch, Redirect } from "react-router-dom"

import Register from "../containers/authentication/Register"
import Login from "../containers/authentication/Login"


export default () => (
  <Switch>
    <Route exact path="/auth/login" component={Login} />
    <Route exact path="/auth/register" component={Register} />
    <Redirect from="*" to="/auth/register" />
  </Switch>
)
