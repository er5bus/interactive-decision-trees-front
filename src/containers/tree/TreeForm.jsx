import React from "react"
import { Field, Form, FieldArray, reduxForm } from "redux-form"
import { Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Row, Col } from "reactstrap"

import { required, email, maxLength, minLength } from "./../../utils/validations"

import InputField from "./../../components/InputField"
import InputListField from "./../../components/InputListField"
import InputCheckboxField from "./../../components/InputRadioCheckboxField"
import InputTextareaField from "./../../components/InputTextareaField"

const minLength2 = minLength(2)
const maxLength200 = maxLength(200)
const maxLength500 = maxLength(500)


const renderScore = ({ fields, t }) =>  {

  return (
    <>
      <div className="mt-4">
        <p>{ t("Declare your tree scores to use it later in your Action button if you have any") }</p>
        <Button onClick={() => fields.push({})} color="primary" type="button">
          <i className="fas fa-plus-circle" />
          { t(" Add a Score") }
        </Button>
      </div>
      { fields.map((score, index) => (
        <Row key={index} className="mt-4">
          <Col lg="1" md="2">
            <Button className="form-controle-button" onClick={() => fields.remove(index)} color="danger" type="button">
              <i className="fas fa-trash" />
            </Button>
          </Col>
          <Col lg="5" md="5">
            <Field
              name={`${score}.name`}
              component={InputField}
              className="form-control"
              label={t("Score Name")}
              placeholder={t("Score Name")}
              type="text"
              validate={[ required, minLength2, maxLength200 ]}
            />
          </Col>
          <Col lg="6" md="5">
            <Field
              name={`${score}.description`}
              component={InputTextareaField}
              className="form-control"
              icon="ni ni-email-83"
              label={t("Score Description")}
              placeholder={t("Describe the score")}
              type="text"
              row={3}
              validate={[ required, minLength2, maxLength200 ]}
            />
          </Col>
        </Row>
      )) }
    </>
  )
}

let TreeForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit } = props


  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="tree_name"
        component={InputField}
        className="form-control"
        label={t("Tree Name")}
        placeholder={t("Give your tree a name")}
        type="text"
        validate={[ required, minLength2, maxLength200 ]}
      />
      <Field
        name="description"
        component={InputTextareaField}
        className="form-control"
        icon="ni ni-email-83"
        label={t("Description")}
        placeholder={t("Describe your tree")}
        type="text"
        validate={[ required, minLength2, maxLength500 ]}
      />
      <InputListField
        name="display_style"
        label={t("Display Style")}
        choices={{
          BUTTON: t("Button"),
          PANEL: t("Panel")
        }}
        value="BUTTON"
        type="radio"
        validate={[required]}
      />
      <FieldArray name="scores" component={renderScore} t={t} />
      <div className="text-center">
        <Button className="mt-4" color="primary" type="submit">
          {t("Save tree")}
        </Button>
      </div>
    </Form>
  )
}

TreeForm = reduxForm({
  form: 'tree',
})(TreeForm)

export default connect(
  state => ({
    initialValues: state.tree.item // pull initial values from account reducer
  })
)(TreeForm)
