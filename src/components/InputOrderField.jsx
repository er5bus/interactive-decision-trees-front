import React from 'react'
import PropTypes from 'prop-types'


const InputOrderField = ({input, index}) => {

  React.useEffect(() => {
    input.onChange(index)
  }, [index, input])
  
  return <input {...input} type="hidden" />
}

InputOrderField.propTypes = {
  input: PropTypes.object,
  index: PropTypes.number,
}

export default InputOrderField
