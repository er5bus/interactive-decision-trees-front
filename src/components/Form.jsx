import React from 'react'
import PropTypes from 'prop-types'

const Form = (props) => {
  const { children, onSubmit } = props

  return (
    <form onSubmit={onSubmit}>
      { children }
    </form>
  )
}


Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array
  ]),
}

export default Form
