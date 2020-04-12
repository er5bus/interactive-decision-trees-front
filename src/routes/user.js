import React from 'react'
import {  Route, Switch, Redirect } from "react-router-dom"

import { ROUTES } from "./../constants"

const TreeList = React.lazy( () => import("../containers/tree/TreeList"))
const TreeNew = React.lazy( () => import("../containers/tree/TreeNew"))
const TreeEdit = React.lazy( () => import("../containers/tree/TreeEdit"))

const TreeNodeList = React.lazy( () => import("../containers/node/NodeList"))

const TreeContentNewNode = React.lazy( () => import("../containers/node/content_node/NewNode"))
const TreeContentEditNode = React.lazy( () => import("../containers/node/content_node/EditNode"))
const TreeContentViewNode = React.lazy( () => import("../containers/node/content_node/ViewNode"))

const TreeLogicNewNode = React.lazy( () => import("../containers/node/logic_node/NewNode"))
const TreeLogicEditNode = React.lazy( () =>  import("../containers/node/logic_node/EditNode"))


export default () => (
  <Switch>
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_INDEX } component={TreeList} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW } component={TreeNew} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT } component={TreeEdit} />

    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW } component={TreeNodeList} />

    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW_CONTENT_NODE } component={TreeContentNewNode} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT_CONTENT_NODE } component={TreeContentEditNode} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_CONTENT_NODE } component={TreeContentViewNode} />

    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW_LOGIC_NODE } component={TreeLogicNewNode} />
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT_LOGIC_NODE } component={TreeLogicEditNode} />/>

    <Redirect from="*" to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_INDEX } />
  </Switch>
)
