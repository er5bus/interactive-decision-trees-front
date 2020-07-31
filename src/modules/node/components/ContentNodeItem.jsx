import React from 'react'
import {Badge, Button, Card, CardBody, Col} from "reactstrap"

import { useTranslation } from 'react-i18next'

import { Link } from "react-router-dom"
import { NODE_TYPE } from "./../constants"
import userRoutes from './../../../routes/user'

export default ({ name, question, actions, isTheFirstNode, isTheLastNode, uid, onToggleDeleteModal, onToggleFirstNodeModal, onToggleLastNodeModal, treeparam }) => {

  const { t } = useTranslation()
  return (
    <Col lg="4" className="pb-5">
      <Card className="card-lift--hover shadow">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle shadow mb-4 mr-2">
            <i className="far fa-file-word" />
          </div>
          <div>
            <h6 className="text-primary text-uppercase">
              { name }{ " (" }{ t("Content Node") }{") "}
              <span className="icon-sm ml-2">
              { isTheFirstNode ? <i className="fas fa-star"></i> : <i className="far fa-star"></i> }
              </span>
            </h6>
          </div>
          <p className="description mt-3">
            { question }
          </p>
          <div>
            { actions && actions.map((action, i) => (
              <Link key={i}
                to={ userRoutes.path + userRoutes.routes.nodeView.path.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
              >
                <Badge className="mr-1" color="primary" pill>{action.name}</Badge>
              </Link>
            )) }
          </div>
          <Button
            className="btn-sm mt-4"
            color="primary"
            to={ userRoutes.path + userRoutes.routes.nodeView.path.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
            tag={Link}
          >
            <i className="fas fa-eye" /> { t("View") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="warning"
            to={ userRoutes.path + userRoutes.routes.nodeContentEdit.path.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
            tag={Link}
          >
            <i className="fa fa-pencil-alt" /> { t("Edit") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="danger"
            disabled={ isTheFirstNode }
            onClick={() => onToggleDeleteModal(uid, NODE_TYPE.CONTENT_NODE ) }
          >
            <i className="fas fa-trash" /> { t("Delete") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="info"
            disabled={ isTheFirstNode }
            onClick={() => onToggleFirstNodeModal(uid ) }
          >
            <i className="fas fa-cog" /> { t("Set as the first node") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="info"
            disabled={ isTheLastNode }
            onClick={() => onToggleLastNodeModal(uid ) }
          >
            <i className="fas fa-cog" /> { t("Set as the last node") }
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}
