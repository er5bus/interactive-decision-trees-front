import React from "react"
import { Field, reduxForm } from "redux-form"
import { Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Spinner } from "reactstrap"

import { required, maxLength, minLength } from "./../../../utils/validations"

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import InputTextareaField from "./../../../components/InputTextareaField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)
const maxLength500 = maxLength(500)


let TagForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit, errors = {}, isLoading } = props

  return (
    <Form onSubmit={handleSubmit} errors={errors}>
      <Field
        name="name"
        component={InputField}
        className="form-control"
        label={t("Tag Name")}
        placeholder={t("Give your tag a name")}
        type="text"
        validate={[ required, minLength2, maxLength200 ]}
      />
      <Field
        name="description"
        component={InputTextareaField}
        className="form-control"
        icon="ni ni-email-83"
        label={t("Description")}
        placeholder={t("Describe your tag")}
        type="text"
        validate={[ required, minLength2, maxLength500 ]}
      />
      <div className="text-center">
        <Button className="mt-4" color="primary" type="submit">
          { isLoading && <Spinner color="white" /> }
          {t("Save tag")}
        </Button>
      </div>
    </Form>
  )
}

TagForm = reduxForm({
  form: 'tag',
  touchOnBlur: false
})(TagForm)

export default connect(
  state => ({
    initialValues: state.tag.item // pull initial values from account reducer
  })
)(TagForm)
