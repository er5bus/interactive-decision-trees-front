import React from "react"
import { Field, FieldArray, reduxForm, stopSubmit, clearSubmitErrors } from "redux-form"
import { Button, Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Row, Col } from "reactstrap"

import { required, maxLength, minLength } from "./../../../utils/validations"

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import SelectField from "./../../../components/SelectField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)


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
  const { handleSubmit, scores = [], isLoading, nodes = [], reset } = props

  React.useEffect(() => {
    if (props.errors && props.errors.error && props.errors.error.match("bad-request")){
      props.dispatch(stopSubmit("logic_node", props.errors && props.errors.message))
    }else {
      props.dispatch(clearSubmitErrors("logic_node"))
    }
  }, [props])

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
      <div className="text-center mt-5 border-top">
        <Button className="mt-4 pl-5 pr-5" color="primary" type="submit">
          { isLoading ? <Spinner color="white mr-2" /> : <i className="fas fa-save mr-2"></i> }
          {t("Save logic node")}
        </Button>
        <Button className="mt-4 pl-5 pr-5" color="warning" onClick={reset}>
          <i className="fas fa-trash mr-2"></i> {t("Clear values")}
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
    initialValues: state.node.item // pull initial values from account reducer
  })
)(LogicNodeForm)
