import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { sessionService } from 'redux-react-session'

// load style
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/scss/main.scss"

// store
import configureStore from "./configureStore"

// loader
import Loader from "./components/Loader"

import routes from "./routes"

// load translation
import './i18n'

const AnonymousLayout = React.lazy( () => import("./modules/layouts/containers/AnonymousLayout"))
const  UserLayout = React.lazy( () =>  import("./modules/layouts/containers/UserLayout"))

const store = configureStore()

// Init the session service
sessionService.initSessionService(store, {refreshOnCheckAuth: true})
  .finally(() =>
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route path={ routes.anonymous.path } component={AnonymousLayout} />
              <Route onEnter={sessionService.checkAuth} path={ routes.user.path } component={UserLayout} />
              <Redirect from="*" to={ routes.anonymous.path } />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    )
  )

