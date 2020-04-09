import React, { Component } from 'react'
import { useTranslation } from "react-i18next"

import { FormGroup } from "reactstrap"

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default ({ label, placeholder, input, meta: { touched, error, warning } }) => {

  const textRef = React.useRef()
  const { t } = useTranslation()

  const onChange = (event, editor) => {
    textRef.current.value = editor.getData()
  }

  return (
    <FormGroup className="mb-3">
      { label && <label className="control-label">{label}</label>}
      <CKEditor
        editor={ ClassicEditor }
        data={ placeholder }
        onChange={ onChange }
      />
      <textarea ref={textRef} {...input} className="display-none"></textarea>
      <div className="danger-msg">
        {touched && ((error && <span>{t(error)}</span>) || (warning && <span>{t(warning)}</span>))}
      </div>
    </FormGroup>
  )
}
