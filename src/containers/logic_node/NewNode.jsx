import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"
import Alert from "./../../components/Alert"

import { createNode, clearNodeForm, fetchAllScores, fetchAllNodes } from "./actions"

import LogicNodeForm from "./Form"

import nodeIcon from "./../../assets/img/nodes.svg"


class LogicNodeNew extends React.Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    const { params } = this.props.match
    this.props.clearNodeForm(params)
    this.props.fetchAllScores(params)
    this.props.fetchAllNodes(params)
  }

  onSubmit = (values) => {
    const { treeparam } = this.props.match.params
    this.props.createNode(treeparam, values)
  }

  render() {
    const { error, scores, nodes, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Graph icon" />
                  {" "}{t("Create New Logic Node")}
                </h1>
                <p className="lead text-white">
                  { t("Jump to a node based upon the value of a variable.") }
                </p>
              </Col>
            </Row>
          </div>
        </Container>

        <Row className="justify-content-center">
          { error &&  <Col lg="12"><Alert.Error object={error} /></Col> }
          <Col lg="12" md="12">
            <Card className="shadow">
              <CardBody className="px-lg-5 py-lg-5">
                <LogicNodeForm scores={scores} nodes={nodes} onSubmit={this.onSubmit} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ createNode, clearNodeForm, fetchAllScores, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.logicNode

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LogicNodeNew))
