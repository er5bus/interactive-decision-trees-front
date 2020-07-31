import React from "react"
import { Field, FieldArray, reduxForm, stopSubmit, clearSubmitErrors } from "redux-form"
import { Button, Spinner } from "reactstrap"
import { useTranslation } from "react-i18next"
import { connect } from "react-redux"

import { Row, Col } from "reactstrap"

import { required, maxLength, minLength } from "./../../../utils/validations"

import { POINT_TO } from './../constants'

import Form from "./../../../components/Form"
import InputField from "./../../../components/InputField"
import InputOrderField from "./../../../components/InputOrderField"
import InputTextareaField from "./../../../components/InputTextareaField"
import EditorField from "./../../../components/EditorField"
import SelectField from "./../../../components/SelectField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)
const maxLength500 = maxLength(500)
const maxLength1500 = maxLength(1500)


const renderValues = ({ fields, allScores, t }) =>  {

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
              choices={ allScores }
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

let pointTo = {}

const renderAction = ({ fields, allScores, allNodes, allTrees, t }) =>  {

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
              <Col lg="4">
                <Field
                  name={`${action}.order`}
                  type="hidden"
                  component={ InputOrderField }
                  index={ index }
                />
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
              <Col lg="3">
                <Field
                  name={`${action}.pointToType`}
                  component={SelectField}
                  label={t("Point to")}
                  placeholder={ t("Nothing for now") }
                  choices={ [
                    { value: POINT_TO.NOTHING, label: "Nothing for now" },
                    { value: POINT_TO.LOGIC_NODE, label: "Logic Nodes" },
                    { value: POINT_TO.CONTENT_NODE, label: "Content Nodes" },
                    { value: POINT_TO.TREES, label: "Trees" }
                  ] }
                  onChange={ (value) => pointTo[index] = value }
                  format={ (value, name) => { pointTo[index] = value; return value }}
                  validate={ required }
                />
              </Col>
              <Col lg="5">
                { pointTo[index] === POINT_TO.LOGIC_NODE &&
                <Field
                  name={`${action}.pointToNode.id`}
                  component={SelectField}
                  label={t("Point to Logic node")}
                  placeholder={ t("Point to an Existing logic node") }
                  choices={ allNodes.logicNodes }
                  validate={ [ required ] }
                />
                }
                { pointTo[index] === POINT_TO.CONTENT_NODE &&
                  <Field
                    name={`${action}.pointToNode.id`}
                    component={SelectField}
                    label={t("Point to Content node")}
                    placeholder={ t("Point to an Existing content node") }
                    choices={ allNodes.contentNodes }
                    validate={ [ required ] }
                  />
                }
                {pointTo[index] === POINT_TO.TREES && 
                  <Field
                  name={`${action}.pointToTree.id`}
                  component={SelectField}
                  label={t("Point to tree")}
                  placeholder={ t("Point to an Existing tree") }
                  choices={ allTrees }
                  validate={ [ required ] }
                />
                }
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FieldArray name={`${action}.values`} allScores={allScores} component={renderValues} t={t} />
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
  const { handleSubmit, allScores, allNodes, allTrees, isLoading=false, reset } = props

  React.useEffect(() => {
    if (props.errors && props.errors.error && props.errors.error.match("bad-request")){
      props.dispatch(stopSubmit("content_node", props.errors && props.errors.message))
    }else {
      props.dispatch(clearSubmitErrors("content_node"))
    }
  }, [props])

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={InputField}
        className="form-control"
        label={t("Node Name")}
        placeholder={t("The title of this node. Appears above the content")}
        type="text"
        validate={[ required, minLength2, maxLength200 ]}
      />
      <Field
        name="contentArea"
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
      <FieldArray
        name="actions"
        allScores={allScores}
        allNodes={allNodes}
        allTrees={ allTrees }
        rerenderOnEveryChange={true}
        component={renderAction}
        t={t}
      />
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
