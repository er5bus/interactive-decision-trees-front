import React from 'react'
import { Field, reduxForm } from "redux-form"

import { useTranslation } from 'react-i18next'
import { Row, Col} from "reactstrap"

import InputField from "./../../../components/InputField"
import SelectField from "./../../../components/SelectField"

let TreeFilter = (props) => {

  const { tags } = props
  const { t } = useTranslation()

  return (
    <form>
      <Row>
        <Col lg="4">
          <Field
            name="searchTerm"
            component={InputField}
            className="form-control"
            icon="ni ni-zoom-split-in"
            placeholder={t("Search")}
            type="text"
          />
        </Col>
        <Col lg="2" />
        <Col lg="6">
          <Field
            name="tags"
            component={SelectField}
            multi={true}
            placeholder={ t("Filter your tree") }
            choices={ Object.keys(tags).map((id) => ({ value: id, label: tags[id].name, color: tags[id].color }) ) }
          />
        </Col>
      </Row>
    </form>
  )
}

TreeFilter = reduxForm({
  form: 'treeFilter',
  enableReinitialize: true,
})(TreeFilter)

export default TreeFilter

