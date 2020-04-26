import React from "react"

const TagList = React.lazy( () => import("../../modules/tag/containers/TagList"))
const TagNew = React.lazy( () => import("../../modules/tag/containers/TagNew"))
const TagEdit = React.lazy( () => import("../../modules/tag/containers/TagEdit"))


export const tagList = {
  path: "/tags",
  component: TagList
}

export const tagNew = {
  path: "/tag/new",
  component: TagNew
}

export const tagEdit = {
  path: "/tag/:param/edit",
  component: TagEdit
}
