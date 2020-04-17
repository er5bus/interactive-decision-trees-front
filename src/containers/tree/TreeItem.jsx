import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import {Badge, Button, Card, CardBody, Col} from "reactstrap"

import CardNotFound from "./../../components/CardNotFound"

import { ROUTES } from "./../../constants"


export default ({ onToggleModal =f=>f, first_node = null, tree_name, description, scores, uid }) => {

  const { t } = useTranslation()

  return (
    <Col lg="4" className="pb-5">
      <Card className="card-lift--hover shadow border-0">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
            <i className="fas fa-tree" />
          </div>
          <h6 className="text-primary text-uppercase">
            { tree_name }
          </h6>
          <p className="description mt-3">
            { description }
          </p>
          <div>
            { scores && scores.map((score, i) => <Badge key={i} color="primary" pill>{ score.name }</Badge>) }
          </div>
          <Button
            className="btn-sm mt-4"
            color="primary"
            to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW.replace(":param", uid) }
            tag={Link}
          >
            <i className="fas fa-eye" /> { t("View") }
          </Button>
          {
            first_node && first_node.uid &&
            <Button
              className="btn-sm mt-4"
              color="primary"
              to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_VIEW_CONTENT_NODE.replace(":treeparam", uid).replace(":nodeparam", first_node.uid) }
              tag={Link}
            >
              <i className="fas fa-eye" /> { t("overview") }
            </Button>
          }
          <Button
            className="btn-sm mt-4"
            color="warning"
            to={ ROUTES.USER.MAIN_PATH + ROUTES.USER.TREE_EDIT.replace(":param", uid) }
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
