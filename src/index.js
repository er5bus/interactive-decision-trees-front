import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { sessionService } from 'redux-react-session'
import { AnimateOnChange } from 'react-animation'


// load style
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/scss/main.scss"

// store
import configureStore from "./configureStore"

// loader
import Loader from "./components/Loader"

import { INIT_STATE, ROUTES } from "./constants"

// load translation
import './i18n'


const AuthLayout = React.lazy( () => import("./containers/layout/AuthLayout"))
const  UserLayout = React.lazy( () =>  import("./containers/layout/UserLayout"))

const store = configureStore(INIT_STATE)

// Init the session service
sessionService.initSessionService(store, {refreshOnCheckAuth: true})
  .finally(() =>
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <React.Suspense fallback={<Loader />}>
            <Switch>
              <Route onEnter={sessionService.checkAuth} path={ROUTES.AUTH.MAIN_PATH} component={AuthLayout} />
              <Route path={ROUTES.USER.MAIN_PATH} component={UserLayout} />
              <Redirect from="*" to={ ROUTES.AUTH.MAIN_PATH } />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Provider>,
      document.getElementById("root")
    )
  )
