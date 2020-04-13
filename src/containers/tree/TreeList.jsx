import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Badge, Button, Card, CardBody, Container,Row, Col, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import ConfirmModal from "./../../components/ConfirmModal"
import CardNotFound from "./../../components/CardNotFound"
import FilterNavbar from "./../../components/FilterNavbar"

import TreeItem from "./TreeItem"

import graphIcon from "./../../assets/img/graph.svg"

import { ROUTES } from "./../../constants"

import { fetchTrees, filterTrees, deleteTree } from "./actions"
import { getFilteredTrees } from "./selector"

import InfiniteScroll from 'react-infinite-scroller'

//import Moment from 'react-moment'


class TreeList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      uid: null,
    }
  }

  componentWillMount(){
    this.props.fetchTrees(1)
  }

  onToggleModal = (uid) => {
    this.setState({ showModal: !this.state.showModal, uid })
  }

  onFetchTrees = (pageNumber) => {
    if (!this.props.isLoading){
      this.props.fetchTrees(pageNumber)
    }
  }

  onSearch = (e) => {
    this.props.filterTrees(e.target.value.trim())
  }

  onDeleteTree = () => {
    this.props.deleteTree(this.state.uid)
  }

  render() {
    const { t, items, hasMore } = this.props
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
          <Row>
            <Col className="pb-5" lg="12">
              <FilterNavbar onSearch={this.onSearch} />
            </Col>
            <Col lg="12">
              <InfiniteScroll
                pageStart={1}
                loadMore={this.onFetchTrees}
                hasMore={hasMore}
                loader={<Spinner className="pt-2" key={0} color="primary" />}
              >
                <Row className="row-grid">
                  { !items.length && <CardNotFound /> }
                  { items.map((tree, i) => <TreeItem key={i} {...tree} onToggleModal={this.onToggleModal} />)}
                </Row>
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchTrees, deleteTree, filterTrees }, dispatch)
const mapStateToProps = state => ({
  ...state.tree, items: getFilteredTrees(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TreeList))
