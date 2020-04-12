import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container, Button } from "reactstrap"

import { editContentNode as editNode, fetchContentNode as fetchNode, fetchAllScores, fetchAllNodes } from "./../actions"

import ContentNodeForm from "./Form"

import NodeListLink from "./../../../components/NodeListLink"
import Loader from "./../../../components/Loader"

import nodeIcon from "./../../../assets/img/nodes.svg"


class EditContentNode extends React.Component {

  componentWillMount() {
    const { params } = this.props.match
    this.props.fetchNode(params)
  }

  onSubmit = (values) => {
    const { params } = this.props.match
    this.props.editNode(params, values)
  }

  render() {
    const { error, scores, item, isLoading, t } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Graph icon" />
                  {" "}{t("Preview Content Node")}
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
          { isLoading
            ? <Loader />
            : <Col lg="12" md="12">
              <Card className="shadow">
                <CardBody className="px-lg-5 py-lg-5">
                  { item
                    ? <>
                      <h1 className="pb-2">{ item.node_name }</h1>
                      <p className="pb-2">{ item.content_area }</p>
                      <div>
                        <h3 className="pb-4 text-primary">{ item.question && item.question } ?</h3>
                        { item.actions.map((action, i) => <Button key={i} color="primary">{ action.name }</Button> ) }
                      </div>
                    </>
                    : <>
                      <p>{ t("No node Found") }</p>
                    </>
                  }
                </CardBody>
              </Card>
            </Col>
          }
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ editNode, fetchNode, fetchAllScores, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.node

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(EditContentNode))
