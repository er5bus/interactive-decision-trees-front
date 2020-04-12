import React from 'react'
import { useTranslation } from "react-i18next"

import {
  FormGroup,
  InputGroup
} from "reactstrap"

export default ({input, label, placeholder, className="from-control", row=4, meta: { touched, error, warning }}) => {
  
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
