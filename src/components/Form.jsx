import React from 'react'


export default (props) => {
  const { errors = {} } = props
  const { message: errorMessage = {} } = errors || {}

  const renderError = () => {
    let children = []
    React.Children.forEach(props.children, (child, i) => {
      if (child.props.name){
        children.push(React.cloneElement(child, { key: i}))
        if (typeof errorMessage[child.props.name] === "string"){
          children.push(<p key={child.props.name} className="danger-msg mt--3 mb-3"> { errorMessage[child.props.name]} </p>)  
        }
      }else{
        children.push(React.cloneElement(child, { key: i}))
      }
    })
    return children
  }
  return (
    <form onSubmit={props.onSubmit}>
      { renderError() }
    </form>
  )
}
