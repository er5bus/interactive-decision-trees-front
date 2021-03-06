import React from 'react'
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import {Badge, Button, Card, CardBody, Col} from "reactstrap"

import userRoutes from "./../../../routes/user"

export default ({ onToggleModal=f=>f, onFilterByTag=f=>f, tagList, firstNode = null, tags, treeName, description, scores, uid }) => {

  const { t } = useTranslation()

  return (
    <Col lg="4" className="pb-5">
      <Card className="card-lift--hover shadow border-0">
        <CardBody className="py-5">
          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
            <i className="fas fa-tree" />
          </div>
          <h6 className="text-primary text-uppercase">
            { treeName }
          </h6>
          <p className="description mt-3">
            { description }
          </p>
          <div>
            <h6 className="text-primary text-uppercase d-inline-block mr-2">{ t("Scores") } :</h6>
            { scores.length ? scores.map((score, i) =>
            <Badge key={i} color="primary mr-2 mb-2" pill>{ score.name }</Badge>
            ): <Badge color="primary mr-2 mb-2" pill>{ t("No Scores") }</Badge>
            }
          </div>
          <div className="pt-2">
            <h6 className="text-primary text-uppercase d-inline-block mr-2"> { t("Tags") } :</h6>
            { tags.length ? tags.map((tagId, i) =>
            <span key={i} className="filter-tags" onClick={ () => onFilterByTag(tagId) }>
              <Badge style={{ backgroundColor: tagList[tagId] && tagList[tagId].color }} color="neutral mr-2 mb-2" pill>{ tagList[tagId] && tagList[tagId].name }</Badge>
            </span>
            ) :  <Badge color="primary mr-2 mb-2" pill>{ t("No tags") }</Badge>
            }
          </div>
          <Button
            className="btn-sm mt-4"
            color="primary"
            to={ userRoutes.path + userRoutes.routes.nodeList.path.replace(":param", uid) }
            tag={Link}
          >
            <i className="fas fa-eye" /> { t("View") }
          </Button>
          {
            firstNode && firstNode.uid &&
              <Button
                className="btn-sm mt-4"
                color="info"
                to={ userRoutes.path + userRoutes.routes.nodeOverview.path.replace(":treeparam", uid).replace(":nodeparam", firstNode.uid) }
                tag={Link}
              >
                <i className="fas fa-eye" /> { t("overview") }
              </Button>
          }
          <Button
            className="btn-sm mt-4"
            color="warning"
            to={ userRoutes.path + userRoutes.routes.treeEdit.path.replace(":param", uid) }
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
