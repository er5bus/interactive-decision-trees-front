import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

// reactstrap components
import { Card, CardBody, Col } from "reactstrap"

import { login, clearError } from "./../actions"

import userIcon from "./../../../assets/img/user.svg"

import LoginForm from "./../components/LoginForm"

class Login extends React.Component {

  componentDidMount(){
    this.props.clearError()
  }

  onSubmit = (values) => {
    this.props.login(values)
  }

  render() {
    const { error, isLoading } = this.props
    return (
      <>
        <Col lg="6" md="8">
          <Card className="shadow">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center">
                <img className="icon-xxl mb-4" alt="" src={userIcon} />
              </div>
              <LoginForm onSubmit={this.onSubmit} errors={error} isLoading={isLoading} />
            </CardBody>
          </Card>
        </Col>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ login, clearError }, dispatch)
const mapStateToProps = state => state.auth

export default connect(mapStateToProps, mapDispatchToProps)(Login)
