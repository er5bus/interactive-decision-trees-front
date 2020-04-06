import React from "react"
import { connect } from "react-redux"
import { Container, Row, Col } from "reactstrap"
import { NavLink, Redirect } from "react-router-dom"
import { withTranslation } from "react-i18next"

import AuthenticationRoutes from "./../../routes/authentication"
import { ROUTES } from "./../../constants"


class AuthLayout extends React.Component {

  render () {
    const { t, authenticated } = this.props

    return authenticated
      ? <Redirect to={ROUTES.USER.MAIN_PATH} />
      : (
        <>
          <div className="main-content">
            <div className="section-cover section-shaped my-0">
              <div className="shape shape-style-1 shape-default alpha-4">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="separator separator-bottom separator-skew">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <polygon className="fill-white" points="2560 0 2560 100 0 100"></polygon>
                </svg>
              </div>
            </div>
            {/* Page content */}
            <Container className="section-content">
              <Row className="justify-content-center">
                <AuthenticationRoutes />
              </Row>
              <Row className="justify-content-center">
                <Col md="8" lg="6">
                  <Row className="mt-3">
                    <Col className="text-left" lg="6" md="6" xs="6">
                      <NavLink to="/auth/login">
                        <small>{t("Already have an account?")}</small>
                      </NavLink>
                    </Col>
                    <Col className="text-right" lg="6" md="6" xs="6">
                      <NavLink to="/auth/register">
                        <small>{t("Don't Have an Account?")}</small>
                      </NavLink>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )
  }
}

const mapStateToProps = state => state.session

export default connect(mapStateToProps)(withTranslation()(AuthLayout))
