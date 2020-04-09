import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"
import Alert from "./../../components/Alert"

import { editNode, fetchNode, clearNodeForm, fetchAllScores, fetchAllNodes } from "./actions"

import ContentNodeForm from "./Form"

import nodeIcon from "./../../assets/img/nodes.svg"


class EditContentNode extends React.Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    const { params } = this.props.match
    this.props.fetchNode(params)
    this.props.fetchAllScores(params)
    this.props.fetchAllNodes(params)
  }

  onSubmit = (values) => {
    const { params } = this.props.match
    this.props.editNode(params, values)
  }

  render() {
    const { error, scores, nodes, item, t } = this.props
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
              </Col>
            </Row>
          </div>
        </Container>
        <Row className="justify-content-center">
          { error &&  <Col lg="12"><Alert.Error object={error} /></Col> }
          <Col lg="12" md="12">
            <Card className="shadow">
              <CardBody className="px-lg-5 py-lg-5">
                <ContentNodeForm scores={scores} nodes={nodes} onSubmit={this.onSubmit} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ editNode, fetchNode, fetchAllScores, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.contentNode

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditContentNode))
