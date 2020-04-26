import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import { createLogicNode as createNode, clearNodeForm, fetchAllScores, fetchAllNodes } from "./../actions"
import userRoutes from "./../../../routes/user"

import LogicNodeForm from "./../components/LogicNodeForm"
import NodeListLink from "./../components/NodeListLink"

import nodeIcon from "./../../../assets/img/nodes.svg"


class LogicNodeNew extends React.Component {

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
    const { error, scores, item, nodes, isLoading, t } = this.props
    const { treeparam } = this.props.match.params
    if (item && item.nodeparam){
      return <Redirect to={ userRoutes.path + userRoutes.routes.nodeList.path.replace(":param", treeparam) } />
    }else {
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
                  <NodeListLink {...this.props.match.params} />
                </Col>
              </Row>
            </div>
          </Container>

          <Row className="justify-content-center">
            <Col lg="12" md="12">
              <Card className="shadow">
                <CardBody className="px-lg-5 py-lg-5">
                  <LogicNodeForm scores={scores} errors={error} isLoading={isLoading} nodes={nodes} onSubmit={this.onSubmit} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ createNode, clearNodeForm, fetchAllScores, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LogicNodeNew))
