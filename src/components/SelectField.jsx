import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"

import chroma from 'chroma-js'
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
  func(values && values.map(value => value.value))
}

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    if (data.color){
      const color =  chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
        color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
        ? 'white'
        : 'black'
        : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      }
    }else {
      return styles
    }
  },
  singleValue: (styles) => {
    return {
      ...styles,
      color: '#8898aa'
    }
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
}

const transformValue = (value, options, multi) => {
  if (multi && typeof value === 'string') return []

  const filteredOptions = options.filter(option => {
    return multi
      ? value.indexOf(option.value) !== -1
      : option.value === value
  });

  return multi ? filteredOptions : filteredOptions[0]
}


const SelectField = ({input, label, placeholder, multi = false, choices = [], meta: { touched, error, warning }}) => {

  const { t } = useTranslation()
  const { value, ...inputAttr } = input
  const transformedValue = transformValue(value, choices, multi)

  return (
    <FormGroup className="mb-3">
      { label && <Label>{ label }</Label>}
      <Select
        {...inputAttr}
        isMulti={multi}
        value={transformedValue}
        className={`input-group-alternative form-control-select ${touched && error && "has-danger"}`}
        classNamePrefix="react-select"
        options={choices}
        onChange={multi ? multiChangeHandler(input.onChange, input) : singleChangeHandler(input.onChange, input)}
        onBlur={() => input.onBlur(input.value )}
        placeholder={placeholder}
        styles={colourStyles}
      />
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}


SelectField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string,
  multi: PropTypes.bool,
  choices: PropTypes.array,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export default SelectField
