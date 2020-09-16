import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroll extends React.PureComponent {

  componentDidMount(){
    window.scrollTo(0, 0)
    window.addEventListener('scroll', this.handleScroll)
    this.initLoad()
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(){
    this.handleScroll()
  }

  initLoad = () => {
    const { isLoading, hasMore, pageNumber } = this.props
    if (pageNumber === 0 && hasMore && !isLoading ){
      this.loadItems()
    }
  }

  handleScroll = () => {
    const { hasMore, isLoading, threshold = 200 } = this.props
    const node = document.documentElement || document.body.parentNode || document.body;
    const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : node.scrollTop;
    const offset = this.calculateOffset(node, scrollTop)

    if ( offset <= Number(threshold) && hasMore && !isLoading) {
      this.loadItems()
    }
  }
  
  calculateOffset = (node, scrollTop) => {
    if (!node) return 0;
    return this.calculateTopPosition(node) + (node.offsetHeight - scrollTop - window.innerHeight)
  }

  calculateTopPosition = (node) => {
    if (!node) return 0;
    return node.offsetTop + this.calculateTopPosition(node.offsetParent)
  }

  loadItems = () => {
    const { loadMore, pageNumber } = this.props
    loadMore.apply(null, [ pageNumber + 1 ])
  }

  render(){

    const { loader, isLoading= true, children, hasMore, pageNumber } = this.props

    return (
      <>
        { (pageNumber > 0 || !hasMore ) && children }
        { isLoading &&  loader }
      </>
    )
  }
}


InfiniteScroll.propTypes = {
  loader: PropTypes.element, 
  isLoading: PropTypes.bool, 
  children:PropTypes.arrayOf(PropTypes.node),
  hasMore: PropTypes.bool,
  threshold: PropTypes.number
}


export default InfiniteScroll
