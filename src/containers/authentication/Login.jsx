import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

// reactstrap components
import { Card, Row, CardBody, Col } from "reactstrap"
import Alert from "./../../components/Alert"

import { login } from "./actions"

import userIcon from "./../../assets/img/user.svg"

import LoginForm from "./LoginForm"

class Login extends React.Component {

  constructor(props){
    super(props)
  }

  onSubmit = (values) => {
    this.props.login(values)
  }

  render() {
    const { error } = this.props
    return (
      <>
        { error
            &&  <Col lg="12">
              <Row className="justify-content-center">
                <Col lg="6" md="8"><Alert.Error object={error} /></Col>
              </Row>
            </Col>
        }
        <Col lg="6" md="8">
          <Card className="shadow">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center">
                <img className="icon-xxl mb-4" alt="" src={userIcon} />
              </div>
              <LoginForm onSubmit={this.onSubmit} />
            </CardBody>
          </Card>
        </Col>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)
const mapStateToProps = state => state.auth

export default connect(mapStateToProps, mapDispatchToProps)(Login)
