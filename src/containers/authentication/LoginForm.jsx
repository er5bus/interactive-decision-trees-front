import React from "react"
import { Field, Form, reduxForm } from "redux-form"
import { Button } from "reactstrap"
import { useTranslation } from "react-i18next"

import { required, email, maxLength, minLength } from "./../../utils/validations"

import InputField from "./../../components/InputField"
import InputRadioField from "./../../components/InputRadioField"

const minLength4 = minLength(4)
const maxLength30 = maxLength(30)

const LoginForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="email"
        component={InputField}
        className="form-control"
        icon="ni ni-email-83"
        label={t("Email")}
        type="text"
        validate={[ email, required ]}
      />
      <Field
        name="password"
        component={InputField}
        className="form-control"
        icon="ni ni-lock-circle-open"
        label={t("Password")}
        type="password"
        validate={[required, minLength4, maxLength30]}
      />
      <Field
        name="remember_me"
        component={InputRadioField}
        choices={{
          accept: t("Remember me")
        }}
      />
      <div className="text-center">
        <Button className="mt-4" color="primary" type="submit">
          {t("Sign in")}
        </Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'login',
})(LoginForm)
