import React from "react"
import { bindActionCreators } from "redux"
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

import { fetchNodes, fetchTree, filterNodes, deleteNode } from "./../actions"
import { NODE_TYPE } from './../constants'
import { getFilteredNodes } from "./../selector"

import userRoutes from './../../../routes/user'

import InfiniteScroll from './../../../components/InfiniteScroll'

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

  componentDidMount() {
    const { params } = this.props.match
    this.props.fetchTree(params)
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
    const { t, tree, match: { params: { param } }, searchTerm, isLoading, items, hasMore } = this.props
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
                  { console.log(tree && tree.first_node) }
                  {
                    tree && tree.first_node &&
                      <Link
                        className="btn-icon mb-3 mb-sm-0 btn btn-info"
                        to={ userRoutes.path + userRoutes.routes.nodeOverview.path.replace(":treeparam", param).replace(":nodeparam", tree.first_node.uid) }
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
              <FilterNavbar onSearch={this.onSearch} value={searchTerm} />
            </Col>
            <Col lg="12">
              <Row className="row-grid">
                { tree ? <InfiniteScroll
                  loadMore={this.onFetchNodes}
                  hasMore={hasMore}
                  clearStore={tree.uid !== param}
                  storeEmpty={items.length === 0}
                  isLoading={isLoading}
                  loader={<NodeLoader />}
                >
                  { !isLoading && items && items.length === 0 && <CardNotFound /> }
                  { items && items.length > 0 && items.map((node, i) => {
                    if (node.node_type === NODE_TYPE.CONTENT_NODE){
                      return <ContentNodeItem key={i} {...node} treeparam={param} onToggleModal={this.onToggleModal} />
                    }
                    if (node.node_type === NODE_TYPE.LOGIC_NODE){
                      return <LogicNodeItem key={i} {...node} treeparam={param} onToggleModal={this.onToggleModal} />
                    }
                    return <></>
                  })
                  }
                </InfiniteScroll>
                : <NodeLoader />
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchTree, fetchNodes, deleteNode, filterNodes }, dispatch)
const mapStateToProps = state => ({
  ...state.node, items: getFilteredNodes(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NodeList))
