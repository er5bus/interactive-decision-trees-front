import React from 'react'
import { useTranslation } from "react-i18next"

import Select from 'react-select'

import {
  FormGroup,
  Label
} from "reactstrap"

const singleChangeHandler = (func, input) => (choice) => {
  func(choice.value)
  input.value = choice.value
}

const multiChangeHandler = (func, input) => (values) => {
  func(values.map(value => value.value))
  input.value = values
}


const transformValue = (value, options, multi) => {

  if (multi && typeof value === 'string') return []

  const filteredOptions = options.filter(option => {
    return multi
      ? value && value.indexOf(option.value) !== -1
      : option.value === value
  });

  return multi ? filteredOptions : filteredOptions[0]
}

export default ({input, label, placeholder, multi = false, choices = [], meta: { touched, error, warning }}) => {

  const { t } = useTranslation()
  let { value, ...inputAttr } = input
  const transformedValue = transformValue(value, choices, multi)

  return (
    <FormGroup className="mb-3">
      <Label>{ label }</Label>
      <Select
        {...inputAttr}
        isMulti={multi}
        value={transformedValue}
        className={`input-group-alternative ${touched && error && "has-danger"}`}
        classNamePrefix="react-select"
        options={choices}
        onChange={multi ? multiChangeHandler(input.onChange, input) : singleChangeHandler(input.onChange, input)}
        onBlur={() => input.onBlur(input.value )}
        placeholder={placeholder}
      />
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}
