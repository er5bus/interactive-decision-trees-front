import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import { editTree, fetchTree, fetchAllNodes } from "./actions"

import TreeForm from "./TreeForm"

import graphIcon from "./../../assets/img/graph.svg"


class TreeEdit extends React.Component {

  componentWillMount(){
    this.props.fetchTree(this.props.match.params)
    this.props.fetchAllNodes(this.props.match.params)
  }

  onSubmit = (values) => {
    const { item } = this.props
    this.props.editTree(item.uid, values)
  }

  render() {
    const { error, t, isLoading, nodes } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="12" className="text-center">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={graphIcon} alt="Graph icon" />
                  {" "}{t("Edit Tree")}
                </h1>
                <p className="lead text-white">
                  { t("Edit Display and Other Settings for this tree") }
                </p>
              </Col>
            </Row>
          </div>
        </Container>

        <Row className="justify-content-center">
          <Col lg="12">
            <Card className="shadow">
              <CardBody className="px-lg-5 py-lg-5">
                <TreeForm onSubmit={this.onSubmit} nodes={nodes} errors={error} isLoading={isLoading} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ editTree, fetchTree, fetchAllNodes }, dispatch)
const mapStateToProps = state => state.tree

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TreeEdit))
