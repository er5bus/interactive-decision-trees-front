import React from "react"

const NodeList = React.lazy( () => import("../../modules/node/containers/NodeList"))

const NodeContentNew = React.lazy( () => import("../../modules/node/containers/NewContentNode"))
const NodeContentEdit = React.lazy( () => import("../../modules/node/containers/EditContentNode"))

const NodeLogicNew = React.lazy( () => import("../../modules/node/containers/NewLogicNode"))
const NodeLogicEdit = React.lazy( () =>  import("../../modules/node/containers/EditLogicNode"))

const NodeView = React.lazy( () => import("../../modules/node/containers/ViewNode"))

export const nodeList = {
  path: "/tree/:param/nodes",
  component: NodeList
}

export const nodeContentNew =  {
  path: "/tree/:treeparam/new/content-node",
  component: NodeContentNew
}

export const nodeContentEdit = {
  path: "/tree/:treeparam/edit/:nodeparam/content-node",
  component: NodeContentEdit
}

export const nodeLogicNew = {
  path: "/tree/:treeparam/new/logic-node",
  component: NodeLogicNew
}

export const nodeLogicEdit = {
  path: "/tree/:treeparam/edit/:nodeparam/logic-node",
  component: NodeLogicEdit
}

export const nodeView = {
  path: "/tree/:treeparam/view/:nodeparam/node",
  component: NodeView
}
