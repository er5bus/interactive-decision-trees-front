import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withTranslation } from "react-i18next"

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import userRoutes from './../../../routes/user'

import { createTree, fetchAllTags, clearTreeForm } from "./../actions"

import TreeForm from "./../components/TreeForm"

import graphIcon from "./../../../assets/img/graph.svg"


class TreeNew extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.fetchAllTags()
    this.props.clearTreeForm()
  }

  onSubmit = (values) => {
    this.props.createTree(values)
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const { item } = this.props
    if (item && item.uid){
      this.props.history.push(userRoutes.path + userRoutes.routes.nodeList.path.replace(":param", item.uid))
    }
  }

  render() {
    const { error, t, tags, isLoading } = this.props
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
          <Col lg="12" md="12">
            <Card className="shadow">
              <CardBody className="px-lg-5 py-lg-5">
                <TreeForm onSubmit={this.onSubmit} isLoading={isLoading} tags={tags} errors={error || {}} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ createTree, fetchAllTags, clearTreeForm }, dispatch)
const mapStateToProps = state => state.tree

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TreeNew))
