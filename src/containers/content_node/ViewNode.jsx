import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {Badge, Button, Card, CardBody, CardImg, Container,Row, Col} from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import ConfirmModal from "./../../components/ConfirmModal"

import graphIcon from "./../../assets/img/graph.svg"
import { ROUTES } from "./../../constants"

import { fetchNode } from "./actions"

import Moment from 'react-moment'


class TreeView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      uid: null
    }
  }

  componentWillMount() {
    this.props.fetchTrees()
  }

  onToggleModal = (uid) => {
    this.setState({ showModal: !this.state.showModal, uid })
  }

  onDeleteTree = () => {
    this.props.deleteTree(this.state.uid)
  }

  render() {
    const { t, items } = this.props
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="6">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={graphIcon} alt="Graph icon" />
                  {t(" My Trees")}
                </h1>
                <p className="lead text-white">
                  { t("Create, Update and Manage your trees") }
                </p>
                <div className="btn-wrapper">
                  <Link
                    className="btn-icon mb-3 mb-sm-0 btn btn-info"
                    to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW }
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-sitemap" />
                    </span>
                    <span className="btn-inner--text">{t('New tree')}</span>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          { this.state.showModal && <ConfirmModal
            open={ this.state.showModal }
            title={ t("Confirmation") }
            content={ t("Are you sure you want to delete this tree ?") }
            onClick={ this.onDeleteTree }
            onToggle={ this.onToggleModal }
            buttonText={ t("Delete this tree") }
          />
          }
          <Row className="justify-content-center">
            <Col lg="12">
              <Row className="row-grid">
                { items.map((tree, i) =>
                <Col key={i} lg="4" className="pb-5">
                  <Card className="card-lift--hover shadow border-0">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                        <i className="fas fa-sitemap" />
                      </div>
                      <h6 className="text-primary text-uppercase">
                        { tree.tree_name }
                      </h6>
                      <p className="description mt-3">
                        { tree.description }
                      </p>
                      <div>
                        <Badge color="primary" pill>{ tree.display_style }</Badge>
                      </div>
                      <Button
                        className="btn-sm mt-4"
                        color="primary"
                        to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW }
                        tag={Link}
                      >
                        <i className="fas fa-eye" /> { t("View") }
                      </Button>
                      <Button
                        className="btn-sm mt-4"
                        color="warning"
                        to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT.replace(":param", tree.uid) }
                        tag={Link}
                      >
                        <i className="fa fa-pencil-alt" /> { t("Edit") }
                      </Button>
                      <Button
                        className="btn-sm mt-4"
                        color="danger"
                        onClick={() => this.onToggleModal(tree.uid) }
                      >
                        <i className="fas fa-trash" /> { t("Delete") }
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
const mapStateToProps = state => state.contentNode


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TreeView))
