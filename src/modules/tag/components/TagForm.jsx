import React from "react"
import { Field, reduxForm, stopSubmit, clearSubmitErrors } from "redux-form"
import { Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Spinner } from "reactstrap"

import { required, maxLength, minLength } from "./../../../utils/validations"

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import ColorPickerField from "./../../../components/ColorPicker"
import InputTextareaField from "./../../../components/InputTextareaField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)
const maxLength500 = maxLength(500)


let TagForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit, isLoading, reset } = props

  React.useEffect(() => {
    if (props.errors && props.errors.error && props.errors.error.match("bad-request")){
      props.dispatch(stopSubmit("tag", props.errors && props.errors.message))
    }else {
      props.dispatch(clearSubmitErrors("tag"))
    }
  }, [props])

  return (
    <Form onSubmit={handleSubmit}>
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
        label={t("Description")}
        placeholder={t("Describe your tag")}
        type="text"
        validate={[ required, minLength2, maxLength500 ]}
      />
      <Field
        name="color"
        component={ColorPickerField}
        className="form-control"
        label={t("Pick a Color for the tag")}
        validate={[ required ]}
      />
      <div className="text-center mt-5 border-top">
        <Button className="mt-4 pl-5 pr-5" color="primary" type="submit">
          { isLoading ? <Spinner color="white mr-2" /> : <i className="fas fa-save mr-2"></i> }
          {t("Save tag")}
        </Button>
        <Button className="mt-4 pl-5 pr-5" color="warning" onClick={reset}>
          <i className="fas fa-trash mr-2"></i> {t("Clear values")}
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
