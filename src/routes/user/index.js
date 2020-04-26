import * as nodeRoutes from './node'
import * as tagRoutes from './tag'
import * as treeRoutes from './tree'


export default {
  path: "/user",
  routes: {
    ...nodeRoutes,
    ...tagRoutes,
    ...treeRoutes
  }
}
