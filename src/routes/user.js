import React from 'react'
import {  Route, Switch, Redirect } from "react-router-dom"

import TreeList from "../containers/tree/TreeList"
import TreeNew from "../containers/tree/TreeNew"
import TreeEdit from "../containers/tree/TreeEdit"

import { ROUTES } from "./../constants"

export default () => (
  <Switch>
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_INDEX } component={TreeList} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW } component={TreeNew} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT } component={TreeEdit} />
    <Redirect from="*" to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_INDEX } />
  </Switch>
)
