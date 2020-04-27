import React from 'react'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { Button, Card, CardBody, Col} from "reactstrap"

import userRoutes from './../../../routes/user'


export default ({ onToggleModal =f=>f, name, description, color, uid }) => {

  const { t } = useTranslation()

  return (
    <Col lg="4" className="pb-5">
      <Card className="card-lift--hover shadow border-0">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-white rounded-circle mb-4" style={{ backgroundColor: color }}>
            <i className="fas fa-tag" />
          </div>
          <h6 className="text-primary text-uppercase">
            { name }
          </h6>
          <p className="description mt-3">
            { description }
          </p>
          <Button
            className="btn-sm mt-4"
            color="warning"
            to={ userRoutes.path + userRoutes.routes.tagEdit.path.replace(":param", uid) }
            tag={Link}
          >
            <i className="fa fa-pencil-alt" /> { t("Edit") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="danger"
            onClick={() => onToggleModal(uid) }
          >
            <i className="fas fa-trash" /> { t("Delete") }
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}
