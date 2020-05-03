import React from "react"
import PropTypes from 'prop-types'

import { Row, Col } from "reactstrap"

import { Field } from "redux-form"
import InputRadioCheckboxField from "./InputRadioCheckboxField"


const InputListField = ({name, type, validate, choices = {}, label}) => {

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

InputListField.propTypes = {
  name: PropTypes.string,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]),
  type: PropTypes.string,
  choices: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  label: PropTypes.string,
}

export default InputListField
