import React from "react"
import PropTypes from 'prop-types'
import { Field, reduxForm, stopSubmit, clearSubmitErrors } from "redux-form"
import { Button, Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"

import { required, email, maxLength, minLength } from "./../../../utils/validations"

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import InputRadioField from "./../../../components/InputRadioCheckboxField"

const minLength4 = minLength(4)
const maxLength30 = maxLength(30)

const LoginForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit, isLoading } = props

  React.useEffect(() => {
    if (props.errors && props.errors.error && props.errors.error.match("bad-request")){
      props.dispatch(stopSubmit("login", props.errors.message))
    }else {
      props.dispatch(clearSubmitErrors("login"))
    }
  }, [props])

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="email"
        component={InputField}
        className="form-control"
        icon="ni ni-email-83"
        placeholder={t("Email")}
        type="text"
        validate={[ email, required ]}
      />
      <Field
        name="password"
        component={InputField}
        className="form-control"
        icon="ni ni-lock-circle-open"
        placeholder={t("Password")}
        type="password"
        validate={[required, minLength4, maxLength30]}
      />
      <Field
        name="remember_me"
        component={InputRadioField}
        label={ t("Remember me") }
        value={true}
        type="checkbox"
      />
      <div className="text-center">
        <Button className="mt-4" color="primary" type="submit">
          { isLoading && <Spinner color="white" /> }
          {t("Sign in")}
        </Button>
      </div>
    </Form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default reduxForm({
  form: 'login',
})(LoginForm)
