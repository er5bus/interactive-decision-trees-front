import React from 'react'
import { Card, CardHeader, Button, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next'
import emptyIcon from "./../../../assets/img/empty.png"

import { POINT_TO } from './../constants'

import NodeDetailsLoader from './NodeDetailLoader'


const NodeDetails = ({ item, isLoading, treeparam, nodeViewPath, mainPath, calculateScore=f=>f }) => {

  const { t } = useTranslation()

  const pointToRoute = (action) => {
    if (nodeViewPath && action.pointToType === POINT_TO.TREES){
      return mainPath + nodeViewPath
        .replace(":treeparam", action.pointToTree.uid)
        .replace(":nodeparam", action.pointToTree.uid && action.pointToTree.first_node.uid)
    }else if (nodeViewPath && (action.pointToType === POINT_TO.CONTENT_NODE || action.pointToType === POINT_TO.LOGIC_NODE) ){
      return mainPath + nodeViewPath
        .replace(":treeparam", treeparam)
        .replace(":nodeparam", action.pointToNode.uid)
    }else {
      return "#"
    }
  }

  return (
    <Card className="shadow">
      <CardHeader className="border-2">
        <h3 className="mb-0">{ t('Node Content') }</h3>
      </CardHeader>
      <CardBody className="px-lg-5 py-lg-5">
        { isLoading ? <NodeDetailsLoader />
        : (item && item.type === "ContentNode")
          ? <>
            <h1 className="pb-2">{ item.nodeName }</h1>
            <p className="pb-2" dangerouslySetInnerHTML={{ __html: item.contentArea }} />
            <div>
              <h3 className="pb-4 text-primary">{ item.question && item.question }</h3>
              { item.actions.map((action, i) =>
                (item.displayStyle === "BUTTON"
                  ? <div key={ action.id }>
                    <Button
                      className="btn mt-4 mr-2"
                      color="primary"
                      disabled={ action.pointToType === POINT_TO.NOTHING }
                      onClick={() => calculateScore(item, action) }
                      to={ pointToRoute(action) }
                      tag={Link}
                    >
                      { action.name }
                    </Button>
                  </div>
                  : <Link
                    key={ action.id }
                    className="panel-link mb-2"
                    onClick={() => calculateScore(item, action) }
                    disabled={ action.pointToType === POINT_TO.NOTHING }
                    to={ pointToRoute(action) }
                  >
                    { action.name }
                  </Link>
                )) }
            </div>
          </>
          : <div className="text-center">
            <img src={ emptyIcon } alt="..." />
            <h6 className="pt-4 text-primary text-uppercase">
              { t("Oops! no node found") }
            </h6>
          </div>
        }
      </CardBody>
    </Card>
  )
}


export default NodeDetails
