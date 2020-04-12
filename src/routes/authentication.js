import React from 'react'
import {  Route, Switch, Redirect } from "react-router-dom"

import { ROUTES } from "./../constants"

const Register = React.lazy( () =>  import("../containers/authentication/Register"))
const Login = React.lazy( () => import("../containers/authentication/Login"))

export default () => (
  <Switch>
    <Route exact path={ ROUTES.AUTH.MAIN_PATH + ROUTES.AUTH.LOGIN } component={Login} />
    <Route exact path={ ROUTES.AUTH.MAIN_PATH + ROUTES.AUTH.REGISTER } component={Register} />
    <Redirect from="*" to={ ROUTES.AUTH.MAIN_PATH + ROUTES.AUTH.LOGIN } />
  </Switch>
)
