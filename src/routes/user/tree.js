import React from "react"

const TreeList = React.lazy( () => import("../../modules/tree/containers/TreeList"))
const TreeNew = React.lazy( () => import("../../modules/tree/containers/TreeNew"))
const TreeEdit = React.lazy( () => import("../../modules/tree/containers/TreeEdit"))


export const treeList = {
  path: "/trees",
  component: TreeList
}

export const treeNew = {
  path: "/tree-new",
  component: TreeNew
}

export const treeEdit = {
  path: "/tree/:param/edit",
  component: TreeEdit
}
