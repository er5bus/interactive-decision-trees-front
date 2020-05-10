import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import { createContentNode as createNode, clearNodeForm, fetchAllScores, fetchAllTrees, fetchAllNodes } from "./../actions"
import userRoutes from "./../../../routes/user"

import ContentNodeForm from "./../components/ContentNodeForm"
import NodeListLink from "./../components/NodeListLink"

import nodeIcon from "./../../../assets/img/nodes.svg"


class ContentNodeNew extends React.Component {

  componentWillMount() {
    const { params } = this.props.match
    this.props.clearNodeForm(params)
    this.props.fetchAllTrees()
    this.props.fetchAllScores(params)
    this.props.fetchAllNodes(params)
  }

  onSubmit = (values) => {
    const { treeparam } = this.props.match.params
    this.props.createNode(treeparam, values, "content")
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const { treeparam } = this.props.match.params
    if (this.props.success){
      this.props.history.push(userRoutes.path + userRoutes.routes.nodeList.path.replace(":param", treeparam))
    }
  }

  render() {
    const { error, scores, isLoading, allNodes, allTrees, allScores, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Graph icon" />
                  {" "}{t("Create New Content Node")}
                </h1>
                <p className="lead text-white">
                  { t("Show a node with information, button choices, or both.") }
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
                <ContentNodeForm allScores={allScores} errors={error} isLoading={isLoading} allNodes={allNodes} allTrees={ allTrees } onSubmit={this.onSubmit} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ createNode, clearNodeForm, fetchAllScores, fetchAllTrees, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContentNodeNew))
