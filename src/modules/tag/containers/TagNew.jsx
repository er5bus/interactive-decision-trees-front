import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { withTranslation } from "react-i18next"

import userRoutes from './../../../routes/user'

// reactstrap components
import { Card, Row, CardBody, Col, Container } from "reactstrap"

import { createTag, clearTagForm } from "./../actions"

import TagForm from "./../components/TagForm"

import tagIcon from "./../../../assets/img/tag.svg"


class TagNew extends React.Component {

  componentWillMount() {
    this.props.clearTagForm()
  }

  onSubmit = (values) => {
    this.props.createTag(values)
  }

  render() {
    const { error, t, item, isLoading } = this.props
    if (item && item.param){
      return <Redirect to={ userRoutes.path + userRoutes.routes.tagList.path.replace(":param", item.param) } />
    }else {
      return (
        <>
          <Container className="py-lg-md d-flex pb-5">
            <div className="col px-0">
              <Row>
                <Col lg="12" className="text-center">
                  <h1 className="display-3 text-white">
                    <img className="icon-lg" src={tagIcon} alt="Tag icon" />
                    {" "}{t("Create New Tag")}
                  </h1>
                  <p className="lead text-white">
                    { t("Creating a tag") }
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
          <Row className="justify-content-center">
            <Col lg="12" md="12">
              <Card className="shadow">
                <CardBody className="px-lg-5 py-lg-5">
                  <TagForm onSubmit={this.onSubmit} isLoading={isLoading} errors={error || {}} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )
    }
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ createTag, clearTagForm }, dispatch)
const mapStateToProps = state => state.tag

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TagNew))
