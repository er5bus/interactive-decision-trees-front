import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next"

import { FormGroup } from "reactstrap"

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const EditorField = ({ label, placeholder, input, meta: { touched, error, warning } }) => {

  const { t } = useTranslation()

  const onChange = (event, editor) => {
    input.onChange(editor.getData())
  }

  return (
    <FormGroup className="mb-3">
      { label && <label className="control-label">{label}</label>}
      <CKEditor
        editor={ ClassicEditor }
        data={ input.value }
        onChange={ onChange }
        placeholder = { placeholder }
      />
      <input type="hidden" {...input} />
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}

EditorField.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  })
}

export default EditorField
