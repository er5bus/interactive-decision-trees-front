import React from "react"
import { Field, Form, FieldArray, reduxForm } from "redux-form"
import { Button } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Row, Col } from "reactstrap"

import { required, maxLength, minLength } from "./../../utils/validations"

import InputField from "./../../components/InputField"
import InputListField from "./../../components/InputListField"
import InputCheckboxField from "./../../components/InputRadioCheckboxField"
import InputTextareaField from "./../../components/InputTextareaField"
import EditorField from "./../../components/EditorField"
import SelectField from "./../../components/SelectField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)
const maxLength500 = maxLength(500)
const maxLength1500 = maxLength(1500)


const renderRule = ({ fields, scores = [], nodes = [] , t }) =>  {
  return (
    <>
      <div className="mt-4">
        <p>{ t("Choose rules for jumping to a new node, in the order shown below.") }</p>
        <Button onClick={() => fields.push({})} color="primary" type="button">
          <i className="fas fa-plus-circle" />
          { t(" Add rule") }
        </Button>
      </div>
      { fields.map((rule, index) => (
        <Row key={index} className="mt-4">
          <Col lg="11" md="10">
            <Row>
              <Col lg="3" md="2">
                <Field
                  name={`${rule}.score.id`}
                  component={SelectField}
                  label={t("Select Score")}
                  placeholder={ t("Pick a score") }
                  choices={ scores }
                  validate={[ required ]}
                />
              </Col>
              <Col lg="3" md="2">
                <Field
                  name={`${rule}.operator`}
                  component={SelectField}
                  label={t("Operator")}
                  placeholder={ t("Pick an operator") }
                  choices={[
                    { value: "=", label: t("Equal")},
                    { value: "!=", label: t("NotEqual")},
                    { value: ">", label: t("GreaterThan")},
                    { value: "<", label: t("LessThan")},
                    { value: ">=", label: t("GreaterThanOrEqual")},
                    { value: "=<", label: t("LessThanOrEqual")}
                  ]}
                  validate={[ required ]}
                />
              </Col>
              <Col lg="3" md="4">
                <Field
                  name={`${rule}.value`}
                  component={InputField}
                  className="form-control"
                  label={t("Score Text/Value")}
                  placeholder={t("Set the score value")}
                  type="text"
                  validate={[ required ]}
                />
              </Col>
              <Col lg="3" md="2">
                <Field
                  name={`${rule}.point_to.id`}
                  component={SelectField}
                  label={t("Go to")}
                  placeholder={ t("Pick a node") }
                  choices={ nodes }
                  validate={[ required ]}
                />
              </Col>
            </Row>
          </Col>
          <Col lg="1" md="2">
            <Button className="form-controle-button" onClick={() => fields.remove(index)} color="danger" type="button">
              <i className="fas fa-trash" />
            </Button>
          </Col>
        </Row>
      )) }
    </>
  )
}

let LogicNodeForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit, scores = [], nodes = [] } = props

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="node_name"
        component={InputField}
        className="form-control"
        label={t("Node Name")}
        placeholder={t("The title of this node. Appears above the content")}
        type="text"
        validate={[ required, minLength2, maxLength200 ]}
      />

      <FieldArray name="rules" scores={scores} nodes={nodes} component={renderRule} t={t} />

      <div className="mt-4">
        <Field
          name="default_node.id"
          component={SelectField}
          label={t("If no rules apply, go to")}
          placeholder={ t("New node you will create later") }
          choices={ nodes }
          validate={[ required ]}
        />
      </div>
      <div className="text-center">
        <Button className="mt-4" color="primary" type="submit">
          {t("Save node")}
        </Button>
      </div>
    </Form>
  )
}

LogicNodeForm = reduxForm({
  form: 'logic_node',
})(LogicNodeForm)

export default connect(
  state => ({
    initialValues: state.logicNode.item // pull initial values from account reducer
  })
)(LogicNodeForm)
