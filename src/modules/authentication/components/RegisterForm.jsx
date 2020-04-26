import React from "react"
import { Field, reduxForm } from "redux-form"
import { Button, Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"

import { required, email, maxLength, minLength } from "./../../../utils/validations"

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import InputRadioField from "./../../../components/InputRadioCheckboxField"

const minLength4 = minLength(4)
const maxLength30 = maxLength(30)

const RegisterForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit, errors, isLoading } = props

  return (
    <Form onSubmit={handleSubmit} errors={errors}>
      <Field
        name="full_name"
        component={InputField}
        className="form-control"
        icon="ni ni-hat-3"
        placeholder={t("Name")}
        type="text"
        validate={[ required, minLength4, maxLength30 ]}
      />
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
        name="privacy_policy"
        component={InputRadioField}
        type="checkbox"
        label={t("I agree with the Privacy Policy")}
        value={true}
        validate={[required]}
      />
      <div className="text-center">
        <Button className="mt-4" color="primary" type="submit">
          { isLoading && <Spinner color="white" /> }
          {t("Create account")}
        </Button>
      </div>
    </Form>
  )
}

export default reduxForm({
  form: 'register',
})(RegisterForm)
