import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TwitterPicker } from 'react-color'
import { Button, Col, Row } from "reactstrap"
import { withTranslation } from "react-i18next"


class ColorPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showPicker: false,
      color: '#fff'
    }

    this.colorPickerNode = null
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentDidUnMount(){
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = (e) => {
    if (this.state.showPicker && this.colorPickerNode && !this.colorPickerNode.contains(e.target) ){
      this.setState({  showPicker: false })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const { input } = this.props
    this.setState({ color: input.value })
  }

  toggleColor = (e) => {
    e.preventDefault()

    this.setState({
      showPicker: !this.state.showPicker
    })
  }

  handleChangeComplete = (color, event) => {
    const { input } = this.props
    this.setState({ color: color.hex })
    input.onChange(color.hex)
  }

  render() {
    const { input, label, t, meta: { touched, error, warning } } = this.props
    return (
      <div ref={ (node) => this.colorPickerNode = node }>
        <Row className="pb-2">
          <Col lg="5">
            <input type="hidden" {...input} />
            <Button color="primary btn-block" onClick={this.toggleColor}>
              { label }
              <div className="color-picker__color" style={{ backgroundColor: this.state.color }}></div>
            </Button>
            {this.state.showPicker && <div className="color-picker__picker">
              <TwitterPicker color={ this.state.color }
                onChangeComplete={this.handleChangeComplete}
                disableAlpha={true} width={250} />
            </div>}

            <div className="danger-msg">
              {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

ColorPicker.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export default withTranslation()(ColorPicker)
