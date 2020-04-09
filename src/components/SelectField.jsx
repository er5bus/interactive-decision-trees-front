import React from 'react'
import { useTranslation } from "react-i18next"

import {
  FormGroup,
  InputGroup,
  Label
} from "reactstrap"

export default ({input, label, placeholder, choices = [], meta: { touched, error, warning }}) => {

  const { t } = useTranslation()

  return (
    <FormGroup className="mb-3">
      <Label>{ label }</Label>
      <select { ...input } className={`form-control input-group-alternative ${touched && error && "has-danger"}`}>
        <option value="">{ placeholder }</option>
        { choices.map( (choice, i) => <option key={i} value={ choice.value }>{ choice.label }</option> ) }
      </select>
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}
