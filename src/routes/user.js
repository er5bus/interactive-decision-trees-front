import React from 'react'
import {  Route, Switch, Redirect } from "react-router-dom"

import TreeList from "../containers/tree/TreeList"
import TreeNew from "../containers/tree/TreeNew"
import TreeEdit from "../containers/tree/TreeEdit"

import TreeNodeList from "../containers/node/NodeList"

import TreeContentNewNode from "../containers/content_node/NewNode"
import TreeContentEditNode from "../containers/content_node/EditNode"
import TreeContentViewNode from "../containers/content_node/ViewNode"

import TreeLogicNewNode from "../containers/logic_node/NewNode"
import TreeLogicEditNode from "../containers/logic_node/EditNode"
import TreeLogicViewNode from "../containers/logic_node/ViewNode"



import { ROUTES } from "./../constants"

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
    <Route exact path={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_LOGIC_NODE } component={TreeLogicViewNode} />

    <Redirect from="*" to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_INDEX } />
  </Switch>
)
