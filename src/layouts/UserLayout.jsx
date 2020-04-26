import React from "react"
import { connect } from "react-redux"
import { Container } from "reactstrap"
import { Redirect, Switch, Route } from "react-router-dom"

import userRoutes from "./../routes/user"
import anonymousRoutes from "./../routes/anonymous"

import UserNavbar from "./../components/UserNavbar"
import Notifications from 'react-notification-system-redux'

class UserLayout extends React.Component {

  render() {

    const { user: { full_name  }, authenticated, notifications = null } = this.props

    return !authenticated
      ? <Redirect to={ anonymousRoutes.path } />
      : (
        <>
          { notifications && <Notifications notifications={notifications} />}
          <UserNavbar userName={full_name} />
          <main>
            <div className="position-relative">
              {/* shape Hero */}
              <section className="section-cover-lg section-shaped">
                <div className="shape shape-style-1 shape-default">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                {/* SVG separator */}
                <div className="separator separator-bottom separator-skew">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x="0"
                    y="0"
                  >
                    <polygon
                      className="fill-white"
                      points="2560 0 2560 100 0 100"
                    />
                  </svg>
                </div>
              </section>
              {/* 1st Hero Variation */}
            </div>
            <Container className="section section-content-lg section-lg pt-lg-0">
              <Switch>
                  {
                    Object.keys(userRoutes.routes).map((routeName, i) =>
                      userRoutes.routes[routeName].path && 
                      <Route 
                        key={i} 
                        exact path={ userRoutes.path + userRoutes.routes[routeName].path} 
                        component={ userRoutes.routes[routeName].component} 
                      />
                    )
                  }

                  <Redirect from="*" to={ userRoutes.path + userRoutes.routes.treeList.path } />
                </Switch>
            </Container>
          </main>
        </>
      )
  }
}

const mapStateToProps = state => ({ ...state.session, notifications: state.notifications })

export default connect(mapStateToProps)(UserLayout)
