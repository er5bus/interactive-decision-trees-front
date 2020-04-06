import React from 'react'
import {  Route, Switch, Redirect } from "react-router-dom"

import Register from "../containers/authentication/Register"
import Login from "../containers/authentication/Login"

import { ROUTES } from "./../constants"

export default () => (
  <Switch>
    <Route exact path={ ROUTES.AUTH.MAIN_PATH + ROUTES.AUTH.LOGIN } component={Login} />
    <Route exact path={ ROUTES.AUTH.MAIN_PATH + ROUTES.AUTH.REGISTER } component={Register} />
    <Redirect from="*" to={ ROUTES.AUTH.MAIN_PATH + ROUTES.AUTH.LOGIN } />
  </Switch>
)
