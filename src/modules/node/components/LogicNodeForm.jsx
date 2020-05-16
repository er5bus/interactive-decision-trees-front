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
import SelectField from "./../../../components/SelectField"


const minLength2 = minLength(2)
const maxLength200 = maxLength(200)

let pointTo = {}

const renderRule = ({ fields, allScores, allNodes, allTrees, t }) =>  {

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
          <Col lg="1" md="2">
            <Button className="form-controle-button" onClick={() => fields.remove(index)} color="danger" type="button">
              <i className="fas fa-trash" />
            </Button>
          </Col>
          <Col lg="3" md="2">
            <Field
              name={`${rule}.order`}
              component={ InputOrderField }
              index={ index }
            />
            <Field
              name={`${rule}.score.id`}
              component={SelectField}
              label={t("Select Score")}
              placeholder={ t("Pick a score") }
              choices={ allScores }
              validate={[ required ]}
            />
          </Col>
          <Col lg="4" md="2">
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
          <Col lg="4" md="4">
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
          <Col lg="1"/>
          <Col lg="5">
            <Field
              name={`${rule}.point_to_type`}
              component={SelectField}
              label={t("Point to")}
              placeholder={ t("Choose a type") }
              choices={ [
                { value: POINT_TO.LOGIC_NODE, label: "Logic Nodes" },
                { value: POINT_TO.CONTENT_NODE, label: "Content Nodes" },
                { value: POINT_TO.TREES, label: "Trees" }
              ] }
              onChange={ (value) => pointTo[index] = value }
              format={ (value, name) => { pointTo[index] = value; return value }}
              validate={ [required ] }
            />
          </Col>
          <Col lg="6">
            { pointTo[index] === POINT_TO.LOGIC_NODE &&
            <Field
              name={`${rule}.point_to_node.id`}
              component={SelectField}
              label={t("Point to Logic node")}
              placeholder={ t("Point to an Existing logic node") }
              choices={ allNodes.logicNodes }
              validate={ [ required ] }
            />
            }
            { pointTo[index] === POINT_TO.CONTENT_NODE &&
              <Field
                name={`${rule}.point_to_node.id`}
                component={SelectField}
                label={t("Point to Content node")}
                placeholder={ t("Point to an Existing content node") }
                choices={ allNodes.contentNodes }
                validate={ [ required ] }
              />
            }
            {pointTo[index] === POINT_TO.TREES && <Field
              name={`${rule}.point_to_tree.id`}
              component={SelectField}
              label={t("Point to tree")}
              placeholder={ t("Point to an Existing tree") }
              choices={ allTrees }
              validate={ [ required ] }
            />
            }
          </Col>
        </Row>
      )) }
    </>
  )
}

let LogicNodeForm = (props) => {

  const { t } = useTranslation()
  const [ pointTo, setPointTo ] = React.useState()
  const { handleSubmit, isLoading, allScores, allNodes, allTrees, reset } = props

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

      <FieldArray
        name="rules"
        allScores={allScores}
        allNodes={allNodes}
        allTrees={ allTrees }
        rerenderOnEveryChange={true}
        component={renderRule}
        t={t}
      />

      <div  className="pt-4 mb-4 border-bottom">
        <h4> If no rules apply </h4>
      </div>
      <Row>
        <Col lg="4">
          <Field
            name="default_point_to_type"
            component={SelectField}
            label={t("Point to")}
            placeholder={ t("Choose a type") }
            choices={ [
              { value: POINT_TO.LOGIC_NODE, label: "Logic Nodes" },
              { value: POINT_TO.CONTENT_NODE, label: "Content Nodes" },
              { value: POINT_TO.TREES, label: "Trees" }
            ] }
            onChange={ (value) => value !== pointTo && setPointTo (value) }
            format={ (value, name) => { value && setPointTo(value); return value }}
            validate={ [required] }
          />
        </Col>
        <Col lg="8">
          { pointTo === POINT_TO.LOGIC_NODE &&
          <Field
            name="default_node.id"
            component={SelectField}
            label={t("Point to Logic node ")}
            placeholder={ t("Point to an Existing logic node") }
            choices={ allNodes.logicNodes }
            validate={ [ required ] }
          />
          }
          { pointTo === POINT_TO.CONTENT_NODE &&
            <Field
              name="default_node.id"
              component={SelectField}
              label={t("Point to Content node ")}
              placeholder={ t("Point to an Existing content node") }
              choices={ allNodes.contentNodes }
              validate={ [ required ] }
            />
          }
          {pointTo === POINT_TO.TREES && 
            <Field
            name="default_tree.id"
            component={SelectField}
            label={t("Point to tree")}
            placeholder={ t("Point to an Existing tree") }
            choices={ allTrees }
            validate={ [ required ] }
          />
          }
        </Col>
      </Row>
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
