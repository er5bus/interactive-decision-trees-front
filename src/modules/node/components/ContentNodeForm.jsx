import React from "react"
import { Field, FieldArray, reduxForm, stopSubmit, clearSubmitErrors, change } from "redux-form"
import { Button, Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Row, Col } from "reactstrap"

import { required, maxLength, minLength } from "./../../../utils/validations"

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import InputTextareaField from "./../../../components/InputTextareaField"
import EditorField from "./../../../components/EditorField"
import SelectField from "./../../../components/SelectField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)
const maxLength500 = maxLength(500)
const maxLength1500 = maxLength(1500)


const renderValues = ({ fields, scores, t }) =>  {

  return (
    <>
      <div>
        <p>{ t("Assign Button Click To Score ") }</p>
        <Button onClick={() => fields.push({})} color="primary" type="button">
          <i className="fas fa-plus-circle" />
          { t(" Add a Action value") }
        </Button>
      </div>
      { fields.map((value, index) => (
        <Row key={index} className="mt-4">
          <Col lg="1" md="2">
            <Button className="form-controle-button" onClick={() => fields.remove(index)} color="danger" type="button">
              <i className="fas fa-trash" />
            </Button>
          </Col>
          <Col lg="6" md="6">
            <Field
              name={`${value}.score.id`}
              component={SelectField}
              label={t("Scores")}
              choices={ scores }
              placeholder={t("Select A Score")}
              validate={[ required ]}
            />
          </Col>
          <Col lg="5" md="4">
            <Field
              name={`${value}.value`}
              component={InputField}
              className="form-control"
              label={t("Score Value")}
              placeholder={t("Set the score value")}
              type="text"
              validate={[ required ]}
            />
          </Col>
        </Row>
      )) }
    </>
  )
}

const renderAction = ({ fields, setOrder, scores, nodes, t }) =>  {

  setOrder(fields)

  return (
    <>
      <div className="mt-4">
        <Button onClick={async () => {
          fields.push({})
        }} color="primary" type="button">
          <i className="fas fa-plus-circle" />
          { t(" Add actions") }
        </Button>
      </div>
      { fields.map((action, index) => (
        <Row key={index} className="mt-4">
          <Col lg="1" md="2">
            <Button className="form-controle-button" onClick={async () => {
              fields.remove(index)
            }} color="danger" type="button">
              <i className="fas fa-trash" />
            </Button>
          </Col>
          <Col lg="11" md="10">
            <Row>
              <Field
                name={`${action}.order`}
                type="hidden"
                component="input"
              />
              <Col lg="6" md="6">
                <Field
                  name={`${action}.name`}
                  component={InputField}
                  className="form-control"
                  label={t("Action text")}
                  placeholder={t("This text will appear with action")}
                  type="text"
                  validate={[ required, minLength2, maxLength200 ]}
                />
              </Col>
              <Col lg="6" md="6">
                <Field
                  name={`${action}.point_to.id`}
                  component={SelectField}
                  label={t("Point to")}
                  placeholder={ t("New node you will create later") }
                  choices={ nodes }
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FieldArray name={`${action}.values`} scores={scores} component={renderValues} t={t} />
              </Col>
            </Row>
          </Col>
        </Row>
      )) }
    </>
  )
}

let ContentNodeForm = (props) => {

  const { t } = useTranslation()
  const { handleSubmit, scores, nodes, isLoading=false, dispatch, reset } = props

  React.useEffect(() => {
    if (props.errors && props.errors.error && props.errors.error.match("bad-request")){
      props.dispatch(stopSubmit("content_node", props.errors && props.errors.message))
    }else {
      props.dispatch(clearSubmitErrors("content_node"))
    }
  }, [props])

  const setOrder = (fields) => {
    fields.forEach((action, index) => {
      props.dispatch(change("content_node", `${action}.order`, index ))
    })
  }

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
      <Field
        name="content_area"
        component={EditorField}
        className="form-control"
        label={t("Content area")}
        placeholder={t("Enter the contents of the node here")}
        type="text"
        validate={[ maxLength1500 ]}
      />
      <Field
        name="question"
        component={InputTextareaField}
        className="form-control"
        icon="ni ni-email-83"
        label={t("Question")}
        placeholder={t("Enter a question or prompt")}
        type="text"
        validate={[ required, minLength2, maxLength500 ]}
      />
      <FieldArray name="actions" scores={scores} nodes={nodes} setOrder={setOrder} component={renderAction} t={t} />
      <div className="text-center mt-5 border-top">
        <Button className="mt-4 pl-5 pr-5" color="primary" type="submit">
          { isLoading ? <Spinner color="white mr-2" /> : <i className="fas fa-save mr-2"></i> }
          {t("Save content node")}
        </Button>
        <Button className="mt-4 pl-5 pr-5" color="warning" onClick={reset}>
          <i className="fas fa-trash mr-2"></i> {t("Clear values")}
        </Button>
      </div>
    </Form>
  )
}

ContentNodeForm = reduxForm({
  form: 'content_node',
})(ContentNodeForm)

export default connect(
  state => ({
    initialValues: state.node.item // pull initial values from account reducer
  })
)(ContentNodeForm)
