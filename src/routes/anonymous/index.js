import * as authRoutes from './authentication'


export default {
  path: "/auth",
  routes: {
    ...authRoutes
  }
}
