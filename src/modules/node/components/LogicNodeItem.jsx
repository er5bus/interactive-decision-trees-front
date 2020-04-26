import React from 'react'
import { Button, Card, CardBody, Col} from "reactstrap"

import { useTranslation } from 'react-i18next'

import { Link } from "react-router-dom"
import { NODE_TYPE } from "./../constants"
import userRoutes from './../../../routes/user'

export default ({ node_name, uid, onToggleModal, treeparam }) => {

  const { t } = useTranslation()
  return (
    <Col lg="4" className="pb-5">
      <Card className="card-lift--hover shadow">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
            <i className="fas fa-tools" />
          </div>
          <h6 className="text-primary text-uppercase">
            { node_name } {" ("}{ t("Logic Node") }{")"}
          </h6>
          <Button
            className="btn-sm mt-4"
            color="warning"
            to={ userRoutes.path + userRoutes.routes.nodeLogicEdit.path.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
            tag={Link}
          >
            <i className="fa fa-pencil-alt" /> { t("Edit") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="danger"
            onClick={() => onToggleModal(uid, NODE_TYPE.LOGIC_NODE) }
          >
            <i className="fas fa-trash" /> { t("Delete") }
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}
