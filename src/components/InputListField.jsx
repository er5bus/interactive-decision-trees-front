import React from "react"
import { Row, Col } from "reactstrap"

import { Field } from "redux-form"
import InputRadioCheckboxField from "./InputRadioCheckboxField"


export default ({name, type, validate, choices = {}, label}) => {

  const renderChoices = () => Object.entries(choices).map(([value, key], i) => (
    <Field
      key={value}
      name={name}
      label={key}
      value={value}
      type={type}
      component={InputRadioCheckboxField}
      validate={validate}
    />
  ))

  return (
    <Row className="my-4">
      <Col lg="12">
        { label && <label className="control-label">{label}</label> }
      <Row>
        <Col lg="12">
          {renderChoices()}
        </Col>
      </Row>
      </Col>
    </Row>
  )
}
