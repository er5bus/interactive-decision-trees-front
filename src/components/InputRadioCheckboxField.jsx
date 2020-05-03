import React from "react"
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"
import { Row, Col } from "reactstrap"


const InputRadioCheckboxField = ({input, label, type, meta: { touched, error, warning }}) => {

  const { t } = useTranslation()

  return (
    <Row className="my-1">
      <Col xs="12">
        <div className={`custom-control custom-control-alternative custom-${type}`}>
          <input
            className="custom-control-input"
            id={`${type}-button-${input.value}`}
            type={type}
            value={input.value}
            {...input}
          />
          <label
            className="custom-control-label"
            htmlFor={`${type}-button-${input.value}`}
          >
            <span className="text-muted">
              {label}
            </span>
          </label>
        </div>
      </Col>
      <Col xs="12">
        <div className="danger-msg">
          {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
        </div>
      </Col>
    </Row>
  )
}


InputRadioCheckboxField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export default InputRadioCheckboxField
