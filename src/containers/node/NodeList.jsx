import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Container,Row, Col, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import ConfirmModal from "./../../components/ConfirmModal"
import CardNotFound from "./../../components/CardNotFound"
import FilterNavbar from "./../../components/FilterNavbar"

import ContentNodeItem from "./content_node/NodeItem"
import LogicNodeItem from "./logic_node/NodeItem"


import nodeIcon from "./../../assets/img/nodes.svg"

import { ROUTES } from "./../../constants"
import { fetchNodes, filterNodes, deleteNode } from "./actions"
import {  getFilteredLogicNodes, getFilteredContentNodes } from "./selector"

import InfiniteScroll from 'react-infinite-scroller'

//import Moment from 'react-moment'

class NodeList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      uid: null,
      type: null,
    }
  }

  componentWillMount(){
    this.props.fetchNodes({ ...this.props.match.params, pageNumber: 1 })
  }

  onFetchNodes = async (pageNumber) => {
    if (!this.props.isLoading){
      this.props.fetchNodes({ ...this.props.match.params, pageNumber })  
    }
  }

  onToggleModal = (uid, type) => {
    this.setState({ showModal: !this.state.showModal, uid, type })
  }

  onDeleteNode = () => {
    const { param: treeparam } = this.props.match.params
    const { uid: nodeparam, type: nodeType } = this.state
    this.props.deleteNode({ treeparam, nodeparam, nodeType })
  }

  onSearch = (e) => {
    this.props.filterNodes(e.target.value.trim())
  }

  render() {
    const { t, match: { params: { param } }, tree: {  logic_nodes=[], content_nodes=[] }, hasMore } = this.props
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
          <Row>
            <Col lg="12" className="pb-5">
              <FilterNavbar onSearch={this.onSearch} />
            </Col>
            <Col lg="12">
              <InfiniteScroll
                pageStart={1}
                loadMore={this.onFetchNodes}
                hasMore={hasMore}
                loader={<Col  key="spinner" className="pt-4 pb-4" lg="12"><Spinner className="pt-2" color="primary" /></Col>}
              >
              <Row key={0} className="row-grid">
                { ( content_nodes.length === 0 && logic_nodes.length === 0) && <CardNotFound /> }
                { content_nodes.length > 0 && content_nodes.map((node, i) => <ContentNodeItem key={i} {...node} treeparam={param} onToggleModal={this.onToggleModal} /> )}
                { logic_nodes.length > 0 && logic_nodes.map((node, i) => <LogicNodeItem key={i} {...node} treeparam={param} onToggleModal={this.onToggleModal} /> )}
              </Row>
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchNodes, deleteNode, filterNodes }, dispatch)
const mapStateToProps = state => ({
  ...state.node, tree: { logic_nodes: getFilteredLogicNodes(state), content_nodes: getFilteredContentNodes(state) }
})


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NodeList))
