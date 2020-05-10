import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import { editContentNode as editNode, fetchContentNode as fetchNode, fetchAllTrees, fetchAllScores, fetchAllNodes } from "./../actions"

import ContentNodeForm from "./../components/ContentNodeForm"
import NodeListLink from "./../components/NodeListLink"

import userRoutes from "./../../../routes/user"

import nodeIcon from "./../../../assets/img/nodes.svg"


class EditContentNode extends React.Component {

  componentWillMount() {
    const { params } = this.props.match
    this.props.fetchNode(params)
    this.props.fetchAllTrees()
    this.props.fetchAllScores(params)
    this.props.fetchAllNodes(params)
  }

  onSubmit = (values) => {
    const { params } = this.props.match
    console.log(values)
    this.props.editNode(params, values)
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const { treeparam } = this.props.match.params
    if (this.props.success){
      this.props.history.push(userRoutes.path + userRoutes.routes.nodeList.path.replace(":param", treeparam))
    }
  }

  render() {
    const { error, scores, isLoading, nodes, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Graph icon" />
                  {" "}{t("Create Edit Content Node")}
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
                <ContentNodeForm scores={scores} nodes={nodes} isLoading={isLoading} errors={error} onSubmit={this.onSubmit} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ editNode, fetchNode, fetchAllTrees, fetchAllScores, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditContentNode))
