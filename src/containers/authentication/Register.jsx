import React from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// reactstrap components
import {Card, CardBody, Col} from "reactstrap"

import userIcon from "./../../assets/img/user.svg"

import RegisterForm from "./RegisterForm"

import { register } from "./actions"

class Register extends React.Component {

  onSubmit = (values) => {
    this.props.register(values)
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
              <RegisterForm onSubmit={this.onSubmit} isLoading={isLoading} errors={error || {}} />
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ register }, dispatch)
const mapStateToProps = state => state.auth

export default connect(mapStateToProps, mapDispatchToProps)(Register)
