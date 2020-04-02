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

import AuthLayout from "./components/AuthLayout"

import { INIT_STATE } from "./constants"

// load translation
import './i18n'

const store = configureStore(INIT_STATE)

// Init the session service
sessionService.initSessionService(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path={"/auth"} component={AuthLayout} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
