import React, { PureComponent } from 'react'
import { TwitterPicker } from 'react-color'
import { Button, Col, Row } from "reactstrap"
import { withTranslation, useTranslation } from "react-i18next"


class ColorPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showPicker: false,
      color: '#fff'
    }

    this.toggleColor = this.toggleColor.bind(this)
    this.handleChangeComplete = this.handleChangeComplete.bind(this)
  }

  toggleColor(e) {
    e.preventDefault()

    this.setState({
      showPicker: !this.state.showPicker
    })
  }

  handleChangeComplete(color, event) {
    const { input } = this.props
    this.setState({ color: color.hex })
    input.onChange(color.hex)
  }

  render() {
    const { input, label, t, meta: { touched, error, warning } } = this.props
    this.setState({ color: input.value })
    return (
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
    )
  }
}

export default withTranslation()(ColorPicker)
