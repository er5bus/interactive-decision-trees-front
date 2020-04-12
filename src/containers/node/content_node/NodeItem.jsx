import React from 'react'
import {Badge, Button, Card, CardBody, Col} from "reactstrap"

import { useTranslation } from 'react-i18next'

import { Link } from "react-router-dom"
import { NODE_TYPE } from "./../constants"
import { ROUTES } from "./../../../constants"


export default ({ node_name, question, actions, uid, onToggleModal, treeparam }) => {

  const { t } = useTranslation()
  return (
    <Col lg="4" className="pb-5">
      <Card className="card-lift--hover shadow">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
            <i className="far fa-file-word" />
          </div>
          <h6 className="text-primary text-uppercase">
            { node_name }{ " (" }{ t("Content Node") }{")"}
          </h6>
          <p className="description mt-3">
            { question }
          </p>
          <div>
            { actions && actions.map((action, i) => (
              <Link key={i}
                to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_CONTENT_NODE.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
              >
                <Badge className="mr-1" color="primary" pill>{action.name}</Badge>
              </Link>
            )) }
          </div>
          <Button
            className="btn-sm mt-4"
            color="primary"
            to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_CONTENT_NODE.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
            tag={Link}
          >
            <i className="fas fa-eye" /> { t("View") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="warning"
            to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT_CONTENT_NODE.replace(":treeparam", treeparam).replace(":nodeparam", uid) }
            tag={Link}
          >
            <i className="fa fa-pencil-alt" /> { t("Edit") }
          </Button>
          <Button
            className="btn-sm mt-4"
            color="danger"
            onClick={() => onToggleModal(uid, NODE_TYPE.CONTENT_NODE ) }
          >
            <i className="fas fa-trash" /> { t("Delete") }
          </Button>
        </CardBody>
      </Card>
    </Col>
  )
}
