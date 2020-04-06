import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { sessionService } from 'redux-react-session'

// load style
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/scss/main.scss"

// store
import configureStore from "./configureStore"

// load layouts
import AuthLayout from "./containers/layout/AuthLayout"
import UserLayout from "./containers/layout/UserLayout"

import { INIT_STATE, ROUTES } from "./constants"

// load translation
import './i18n'

const store = configureStore(INIT_STATE)

// Init the session service
sessionService.initSessionService(store, {refreshOnCheckAuth: true})
  .finally(() =>
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route onEnter={sessionService.checkAuth} path={ROUTES.AUTH.MAIN_PATH} component={AuthLayout} />
            <Route path={ROUTES.USER.MAIN_PATH} component={UserLayout} />
          </Switch>
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    )
  )
