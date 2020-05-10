import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroll extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      clearStore: false
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const { clearStore } = this.props
    if (clearStore && !this.state.clearStore){
      this.loadItems(clearStore)
      this.setState({ clearStore })
    }
    this.handleScroll()
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

  loadItems = (clearStore = false) => {
    const { loadMore, pageNumber } = this.props
    loadMore.apply(null, [ !clearStore ? pageNumber + 1 : 1 ])
  }

  render(){

    const { loader, pageNumber, isLoading= true, children } = this.props

    return (
      <>
        { pageNumber > 0 && children }
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
