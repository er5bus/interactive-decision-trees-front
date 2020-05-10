import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Container,Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { withTranslation } from 'react-i18next'

import userRoutes from './../../../routes/user'

import ConfirmModal from "./../../../components/ConfirmModal"
import CardNotFound from "./../../../components/CardNotFound"
import FilterNavbar from "./../../../components/FilterNavbar"
import InfiniteScroll from './../../../components/InfiniteScroll'

import TagItem from "./../components/TagItem"
import TagLoader from "./../components/TagLoader"

import tagIcon from "./../../../assets/img/tag.svg"

import { fetchTags, filterTags, deleteTag } from "./../actions"
import { getFilteredTags } from "./../selector"


//import Moment from 'react-moment'


class TagList extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      uid: null,
    }
  }

  onToggleModal = (uid) => {
    this.setState({ showModal: !this.state.showModal, uid })
  }

  onFetchTags = (pageNumber) => {
    if (!this.props.isLoading){
      this.props.fetchTags(pageNumber)
    }
  }

  onSearch = (e) => {
    this.props.filterTags(e.target.value.trim())
  }

  onDeleteTag = () => {
    this.props.deleteTag(this.state.uid)
  }

  render() {
    const { t, items, page, hasMore, searchTerm, isLoading } = this.props
    return (
      <div>
        <Container className="py-lg-md d-flex pb-5">
          <div className="col px-0">
            <Row>
              <Col lg="6">
                <h1 className="display-3 text-white">
                  <img className="icon-lg" src={tagIcon} alt="Tag icon" />
                  {t(" My Tags")}
                </h1>
                <p className="lead text-white">
                  { t("Create, Update and Manage your tags") }
                </p>
                <div className="btn-wrapper">
                  <Link
                    className="btn-icon mb-3 mb-sm-0 btn btn-info"
                    to={ userRoutes.path + userRoutes.routes.tagNew.path }
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="fas fa-tag" />
                    </span>
                    <span className="btn-inner--text">{t('New tag')}</span>
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
            content={ t("Are you sure you want to delete this tag ?") }
            onClick={ this.onDeleteTag }
            onToggle={ this.onToggleModal }
            buttonText={ t("Delete this tag") }
          />
          }
          <Row>
            <Col className="pb-5" lg="12">
              <FilterNavbar onSearch={this.onSearch} value={ searchTerm } />
            </Col>
            <Col lg="12">
              <Row className="row-grid">
                <InfiniteScroll
                  loadMore={this.onFetchTags}
                  pageNumber={ page }
                  isLoading={isLoading}
                  hasMore={ hasMore }
                  loader={<TagLoader />}
                >
                  { !isLoading && !items.length && <CardNotFound /> }
                  { items.map((tag, i) => <TagItem key={i} {...tag} onToggleModal={this.onToggleModal} />)}
                </InfiniteScroll>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchTags, deleteTag, filterTags }, dispatch)
const mapStateToProps = state => ({
  ...state.tag, items: getFilteredTags(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(TagList))
