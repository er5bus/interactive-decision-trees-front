import React from 'react'
import { useTranslation } from "react-i18next"

import {
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap"

export default ({input, label, className="from-control", icon, type, meta: { touched, error, warning }}) => {
  
  const { t } = useTranslation()

  return (
    <FormGroup className="mb-3">
      <InputGroup className={`input-group-alternative ${touched && error && "has-danger"}`}>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={icon} />
          </InputGroupText>
        </InputGroupAddon>
        <input {...input} className={`${className} ${touched && error && "has-danger"}`} type={type} placeholder={label} />
      </InputGroup>
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}
