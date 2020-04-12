import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import { createContentNode as createNode, clearNodeForm, fetchAllScores, fetchAllNodes } from "./../actions"
import { ROUTES } from "./../../../constants"

import ContentNodeForm from "./Form"
import NodeListLink from "./../../../components/NodeListLink"

import nodeIcon from "./../../../assets/img/nodes.svg"


class ContentNodeNew extends React.Component {

  componentWillMount() {
    const { params } = this.props.match
    this.props.clearNodeForm(params)
    this.props.fetchAllScores(params)
    this.props.fetchAllNodes(params)
  }

  onSubmit = (values) => {
    const { treeparam } = this.props.match.params
    this.props.createNode(treeparam, values, "content")
  }

  render() {
    const { error, scores, item, isLoading, nodes, t } = this.props
    const { treeparam } = this.props.match.params
    if (item && item.nodeparam){
      return <Redirect to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT_CONTENT_NODE.replace(":treeparam", treeparam).replace(":nodeparam", item.nodeparam) } />
    }else {
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
                  <ContentNodeForm scores={scores} errors={error} isLoading={isLoading} nodes={nodes} onSubmit={this.onSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ContentNodeNew))
