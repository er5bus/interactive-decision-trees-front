import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {Badge, Button, Card, CardBody, CardImg, Container,Row, Col} from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import ConfirmModal from "./../../components/ConfirmModal"
import CardNotFound from "./../../components/CardNotFound"

import nodeIcon from "./../../assets/img/nodes.svg"

import { ROUTES } from "./../../constants"
import { fetchNodes, deleteNode } from "./actions"

import Moment from 'react-moment'


class NodeList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      uid: null
    }
  }

  componentWillMount() {
    this.props.fetchNodes(this.props.match.params)
  }

  onToggleModal = (uid) => {
    this.setState({ showModal: !this.state.showModal, uid })
  }

  onDeleteNode = () => {
    this.props.deleteNode(this.state.uid)
  }

  render() {
    const { t, item } = this.props
    const { logic_nodes=[], content_nodes=[] } = item
    const { param } = this.props.match.params
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="6">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={nodeIcon} alt="Node icon" />
                  {t(" My Nodes")}
                </h1>
                <p className="lead text-white">
                  { t("Create, Update and Manage your nodes") }
                </p>
                <div className="btn-wrapper">
                  <Link
                    className="btn-icon mb-3 mb-sm-0 btn btn-info"
                    to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW_CONTENT_NODE.replace(":treeparam", param) }
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-sitemap" />
                    </span>
                    <span className="btn-inner--text">{t('New content node')}</span>
                  </Link>
                  <Link
                    className="btn-icon mb-3 mb-sm-0 btn btn-info"
                    to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_NEW_LOGIC_NODE.replace(":treeparam", param) }
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-sitemap" />
                    </span>
                    <span className="btn-inner--text">{t('New logic node')}</span>
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
            content={ t("Are you sure you want to delete this node ?") }
            onClick={ this.onDeleteNode }
            onToggle={ this.onToggleModal }
            buttonText={ t("Delete this node") }
          />
          }
          <Row className="justify-content-center">
            <Col lg="12">
              <Row className="row-grid">
                { ( content_nodes && !content_nodes.length && logic_nodes && !logic_nodes.length) && <CardNotFound /> }
                { content_nodes && content_nodes.length && content_nodes.map((node, i) =>
                <Col key={i} lg="4" className="pb-5">
                  <Card className="card-lift--hover shadow">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                        <i className="far fa-file-word" />
                      </div>
                      <h6 className="text-primary text-uppercase">
                        { node.node_name }{ " (" }{ t("Content Node") }{")"}
                      </h6>
                      <p className="description mt-3">
                        { node.question }
                      </p>
                      <div>
                        { node.actions.map((action, i) => <Badge key={i} className="mr-1" color="primary" pill>{action.name}</Badge> ) }
                      </div>
                      <Button
                        className="btn-sm mt-4"
                        color="primary"
                        disabled={true}
                        to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_CONTENT_NODE.replace(":treepram", param).replace(":nodeparam", node.uid) }
                        tag={Link}
                      >
                        <i className="fas fa-eye" /> { t("View") }
                      </Button>
                      <Button
                        className="btn-sm mt-4"
                        color="warning"
                        to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT_CONTENT_NODE.replace(":treeparam", param).replace(":nodeparam", node.uid) }
                        tag={Link}
                      >
                        <i className="fa fa-pencil-alt" /> { t("Edit") }
                      </Button>
                      <Button
                        className="btn-sm mt-4"
                        color="danger"
                        onClick={() => this.onToggleModal(node.uid) }
                      >
                        <i className="fas fa-trash" /> { t("Delete") }
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                )}
                { logic_nodes && logic_nodes.length && logic_nodes.map((node, i) =>
                <Col key={i} lg="4" className="pb-5">
                  <Card className="card-lift--hover shadow">
                    <CardBody className="py-5">
                      <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                        <i className="fas fa-tools" />
                      </div>
                      <h6 className="text-primary text-uppercase">
                        { node.node_name } {" ("}{ t("Logic Node") }{")"}
                      </h6>
                      <div>
                        { node.rules.map((rule, i) => <Badge key={i} className="mr-1" color="primary" pill>{rule.operator}{" "}{rule.value}</Badge> ) }
                      </div>
                      <Button
                        className="btn-sm mt-4"
                        color="primary"
                        disabled={true}
                        to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_LOGIC_NODE.replace(":treepram", param).replace(":nodeparam", node.uid) }
                        tag={Link}
                      >
                        <i className="fas fa-eye" /> { t("View") }
                      </Button>
                      <Button
                        className="btn-sm mt-4"
                        color="warning"
                        to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT_LOGIC_NODE.replace(":treeparam", param).replace(":nodeparam", node.uid) }
                        tag={Link}
                      >
                        <i className="fa fa-pencil-alt" /> { t("Edit") }
                      </Button>
                      <Button
                        className="btn-sm mt-4"
                        color="danger"
                        onClick={() => this.onToggleModal(node.uid) }
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchNodes, deleteNode }, dispatch)
const mapStateToProps = state => state.nodes


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NodeList))
