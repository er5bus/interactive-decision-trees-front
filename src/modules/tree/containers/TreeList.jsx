import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { change } from 'redux-form'
import { Container,Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import ConfirmModal from "./../../../components/ConfirmModal"
import CardNotFound from "./../../../components/CardNotFound"

import TreeItem from "./../components/TreeItem"
import TreeFilter from "./../components/TreeFilter"
import TreeLoader from "./../components/TreeLoader"

import graphIcon from "./../../../assets/img/graph.svg"

import userRoutes from "./../../../routes/user"

import { fetchTrees, filterTrees, deleteTree, fetchAllTags } from "./../actions"
import { getFilteredTrees } from "./../selector"

import InfiniteScroll from './../../../components/InfiniteScroll'

//import Moment from 'react-moment'

class TreeList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      uid: null,
    }
  }
  
  UNSAFE_componentWillMount(){
    const { tags } = this.props
    if (tags.length === 0){
      this.props.fetchAllTags()
    }
  }

  onToggleModal = (uid) => {
    this.setState({ showModal: !this.state.showModal, uid })
  }

  onFetchTrees = (pageNumber) => {
    if (!this.props.isLoading){
      this.props.fetchTrees(pageNumber)
    }
  }

  onFilter = (values) => {
    this.props.filterTrees(values)
  }

  onFilterByTag = (tag) => {
    const { filters: { tags = [] } } = this.props
    this.props.change("treeFilter", "tags", [ ...(tags || []), tag.toString()])
  }

  onDeleteTree = () => {
    this.props.deleteTree(this.state.uid)
  }

  render() {
    const { t, items, page, tags, filters, hasMore, isLoading } = this.props
    return (
      <div>
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
                  <Button tag={ Link } to={ userRoutes.path + userRoutes.routes.treeNew.path }  className="btn-icon mb-3 mb-sm-0 btn btn-info">
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-sitemap" />
                    </span>
                    <span className="btn-inner--text">{t('New tree')}</span>
                  </Button>
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
          <Row>
            <Col className="pb-5" lg="12">
              <TreeFilter tags={ tags } onChange={ this.onFilter } initialValues={ filters } />
            </Col>
            <Col lg="12">
              <Row className="row-grid">
              <InfiniteScroll
                loadMore={this.onFetchTrees}
                hasMore={hasMore}
                pageNumber={page}
                isLoading={isLoading}
                loader={<TreeLoader />}
              >
                  { !isLoading && !items.length && <CardNotFound /> }
                  { items.map((tree, i) => <TreeItem key={i} {...tree} tagList={ tags } onFilterByTag={this.onFilterByTag} onToggleModal={this.onToggleModal} />)}
              </InfiniteScroll>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ change, fetchTrees, deleteTree, filterTrees, fetchAllTags }, dispatch)
const mapStateToProps = state => ({
  ...state.tree, items: getFilteredTrees(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TreeList))
