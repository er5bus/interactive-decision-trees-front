import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroll extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      pageNumber: 0
    }
  }

  componentDidMount(){
    const { clearStore = false, storeEmpty = false } = this.props
    let { pageNumber } = this.state
    if ( clearStore || storeEmpty ) {
      pageNumber += 1
      this.setState({ pageNumber }, this.loadItems(pageNumber))
    }
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    this.handleScroll()
  }

  handleScroll = () => {
    const { hasMore, isLoading, threshold = 200 } = this.props
    let { pageNumber } = this.state
    const node = document.documentElement || document.body.parentNode || document.body;
    const scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : node.scrollTop;
    const offset = this.calculateOffset(node, scrollTop)

    if ( offset <= Number(threshold) && hasMore && !isLoading) {
      pageNumber += 1
      this.setState({ pageNumber }, this.loadItems(pageNumber))
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

  loadItems = (pageNumber) => {
    const { loadMore } = this.props
    loadMore.apply(null, [ pageNumber ])
  }

  render(){

    const { loader, isLoading= true, children } = this.props

    return (
      <>
        { children }
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
