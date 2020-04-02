import React from 'react'
import { useTranslation } from "react-i18next"

import {
  Row,
  Col
} from "reactstrap"

export default ({input, choices = {}, meta: { touched, error, warning }}) => {

  const { t } = useTranslation()

  const renderChoices = () => Object.entries(choices).map(([key, value], i) => (
    <Col key={i} xs="12">
      <div className={"custom-control custom-control-alternative custom-checkbox"}>
        <input
          className="custom-control-input"
          id={`radio-button-${i}`}
          type="checkbox"
          value={key}
          {...input}
        />
        <label
          className="custom-control-label"
          htmlFor={`radio-button-${i}`}
        >
          <span className="text-muted">
            {value}
          </span>
        </label>
      </div>
    </Col>
  ))

  return (
    <Row className="my-4">
      {renderChoices()}
      <Col xs="12">
        <div className="danger-msg">
          {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
        </div>
      </Col>
    </Row>
  )
}
