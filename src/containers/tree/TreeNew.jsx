import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"
import Alert from "./../../components/Alert"

import { createTree, clearTreeForm } from "./actions"

import TreeForm from "./TreeForm"

import graphIcon from "./../../assets/img/graph.svg"


class TreeNew extends React.Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    this.props.clearTreeForm()
  }

  onSubmit = (values) => {
    this.props.createTree(values)
    console.log(values)
  }

  render() {
    const { error, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={graphIcon} alt="Graph icon" />
                  {" "}{t("Create New Tree")}
                </h1>
                <p className="lead text-white">
                  { t("Start a new decision tree") }
                </p>
              </Col>
            </Row>
          </div>
        </Container>

        <Row className="justify-content-center">
        { error
            &&  <Col lg="12">
              <Row className="justify-content-center">
                <Col lg="7" md="8"><Alert.Error object={error} /></Col>
              </Row>
            </Col>
        }
        <Col lg="12" md="12">
          <Card className="shadow">
            <CardBody className="px-lg-5 py-lg-5">
              <TreeForm onSubmit={this.onSubmit} />
            </CardBody>
          </Card>
        </Col>
          </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ createTree, clearTreeForm }, dispatch)
const mapStateToProps = state => state.tree

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TreeNew))
