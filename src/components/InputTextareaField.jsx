import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"

import {
  FormGroup,
  InputGroup
} from "reactstrap"

const InputTextareaField = ({input, label, placeholder, className="from-control", row=4, meta: { touched, error, warning }}) => {
  
  const { t } = useTranslation()

  return (
    <FormGroup className="mb-3">
      { label && <label className="control-label">{label}</label>}
      <InputGroup className={`input-group-alternative ${touched && error && "has-danger"}`}>
        <textarea {...input} rows={row} className={`${className} ${touched && error && "has-danger"}`} placeholder={placeholder} />
      </InputGroup>
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}

InputTextareaField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}


export default InputTextareaField
