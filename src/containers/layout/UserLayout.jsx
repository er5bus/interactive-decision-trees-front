import React from "react"
import { connect } from "react-redux"
import { Container } from "reactstrap"
import { Redirect } from "react-router-dom"

import UserRoutes from "./../../routes/user"

import UserNavbar from "./../../components/UserNavbar"
import Notifications from 'react-notification-system-redux'

import { ROUTES } from "./../../constants"


class UserLayout extends React.Component {

  constructor(props){
    super(props)
  }

  render() {

    const { user: { full_name  }, authenticated, notifications = null } = this.props

    return !authenticated
      ? <Redirect to={ROUTES.AUTH.MAIN_PATH} />
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
              <UserRoutes />
            </Container>
          </main>
        </>
      )
  }
}

const mapStateToProps = state => ({ ...state.session, notifications: state.notifications })

export default connect(mapStateToProps)(UserLayout)
