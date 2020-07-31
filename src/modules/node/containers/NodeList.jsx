import React from "react"
import { connect } from "react-redux"
import { Container,Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import ConfirmModal from "./../../../components/ConfirmModal"
import CardNotFound from "./../../../components/CardNotFound"
import FilterNavbar from "./../../../components/FilterNavbar"

import ContentNodeItem from "./../components/ContentNodeItem"
import LogicNodeItem from "./../components/LogicNodeItem"
import NodeLoader from "./../components/NodeLoader"

import nodeIcon from "./../../../assets/img/nodes.svg"

import { fetchNodes, fetchTree, filterNodes, deleteNode, setFirstNode, setLastNode, clearNodes } from "./../actions"
import { NODE_TYPE } from './../constants'
import { getFilteredNodes } from "./../selector"

import userRoutes from './../../../routes/user'

import InfiniteScroll from './../../../components/InfiniteScroll'

//import Moment from 'react-moment'

class NodeList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showDeleteModal: false,
      showUpdateModal: false,
      uid: null,
      type: null,
    }
  }

  componentDidMount() {
    const { match: { params }, tree } = this.props
    if (!tree || !params.param.match(tree.uid)){
      this.props.fetchTree(params)
      this.props.clearNodes()
    }
  }

  onFetchNodes = async (pageNumber) => {
    if (!this.props.isLoading){
      this.props.fetchNodes({ ...this.props.match.params, pageNumber })
    }
  }

  onToggleDeleteModal = (uid, type) => this.setState({ showDeleteModal: !this.state.showDeleteModal, uid, type })
  onToggleFirstNodeModal= (uid) => this.setState({ showFirstNodeModal: !this.state.showFirstNodeModal, uid })
  onToggleLastNodeModal= (uid) => this.setState({ showLastNodeModal: !this.state.showLastNodeModal, uid })

  onDeleteNode = () => {
    const { param: treeparam } = this.props.match.params
    const { uid: nodeparam, type: nodeType } = this.state
    this.props.deleteNode({ treeparam, nodeparam, nodeType })
  }

  onSetFirstNode = () => {
    const { param: treeparam } = this.props.match.params
    const { uid: nodeparam } = this.state
    this.props.setFirstNode({ treeparam, nodeparam })
  }

  onSetLastNode = () => {
    const { param: treeparam } = this.props.match.params
    const { uid: nodeparam } = this.state
    this.props.setLastNode({ treeparam, nodeparam })
  }

  onSearch = (e) => {
    this.props.filterNodes(e.target.value.trim())
  }

  render() {
    const { t, tree, page, match: { params: { param } }, searchTerm, isLoading, items, hasMore } = this.props
    const { showDeleteModal, showLastNodeModal, showFirstNodeModal } = this.state
    return (
      <>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="8">
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
                    to={ userRoutes.path + userRoutes.routes.nodeContentNew.path.replace(":treeparam", param) }
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-sitemap" />
                    </span>
                    <span className="btn-inner--text">{t('New content node')}</span>
                  </Link>
                  <Link
                    className="btn-icon mb-3 mb-sm-0 btn btn-info"
                    to={ userRoutes.path + userRoutes.routes.nodeLogicNew.path.replace(":treeparam", param) }
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-sitemap" />
                    </span>
                    <span className="btn-inner--text">{t('New logic node')}</span>
                  </Link>
                  {
                    tree && tree.firstNode && tree.firstNode.uid &&
                      <Link
                        className="btn-icon mb-3 mb-sm-0 btn btn-info"
                        to={ userRoutes.path + userRoutes.routes.nodeOverview.path.replace(":treeparam", param).replace(":nodeparam", tree.firstNode.uid) }
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fas fa-sitemap" />
                        </span>
                        <span className="btn-inner--text">{t('Tree Overview')}</span>
                      </Link>
                  }
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <Container>
          <ConfirmModal
            isOpen={ showDeleteModal }
            title={ t("Confirmation") }
            content={ t("Are you sure you want to delete this node ?") }
            onClick={ this.onDeleteNode }
            onToggle={ this.onToggleDeleteModal }
            buttonText={ t("Delete this node") }
          />
          <ConfirmModal
            isOpen={ showFirstNodeModal }
            title={ t("Confirmation") }
            content={ t("Are you sure you want to set this node as the start node ?") }
            onClick={ this.onSetFirstNode }
            onToggle={ this.onToggleFirstNodeModal }
            buttonText={ t("Set as First node node") }
          />
          <ConfirmModal
            isOpen={ showLastNodeModal }
            title={ t("Confirmation") }
            content={ t("Are you sure you want to set this node as the last node ?") }
            onClick={ this.onSetLastNode }
            onToggle={ this.onToggleLastNodeModal }
            buttonText={ t("Set as Last node node") }
          />
          <Row>
            <Col lg="12" className="pb-5">
              <FilterNavbar onSearch={this.onSearch} value={searchTerm} />
            </Col>
            <Col lg="12">
              <Row className="row-grid">
                <InfiniteScroll
                  loadMore={this.onFetchNodes}
                  hasMore={hasMore}
                  pageNumber={page}
                  isLoading={isLoading}
                  loader={<NodeLoader />}
                >
                  { !isLoading && items && items.length === 0 && <CardNotFound /> }
                  { items && items.length > 0 && items.map((node, i) => {
                    if (node.nodeType === NODE_TYPE.CONTENT_NODE){
                      return <ContentNodeItem key={i} {...node} 
                        isTheFirstNode={ tree && tree.firstNode && tree.firstNode.uid === node.uid }
                        isTheLastNode={ tree && tree.lastNode && tree.lastNode.uid === node.uid }
                        treeparam={param} 
                        onToggleDeleteModal={this.onToggleDeleteModal} 
                        onToggleFirstNodeModal={this.onToggleFirstNodeModal}
                        onToggleLastNodeModal={this.onToggleLastNodeModal}
                      />
                    }
                    if (node.nodeType === NODE_TYPE.LOGIC_NODE){
                      return <LogicNodeItem key={i} {...node} treeparam={param} onToggleModal={this.onToggleDeleteModal} />
                    }
                    return <></>
                  })
                  }
                </InfiniteScroll>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapStateToProps = state => ({
  ...state.node, items: getFilteredNodes(state)
})


export default connect(mapStateToProps, { fetchTree, setFirstNode, setLastNode, fetchNodes, deleteNode, filterNodes, clearNodes })(withTranslation()(NodeList))
