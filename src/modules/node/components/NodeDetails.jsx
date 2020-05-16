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
    if (nodeViewPath && action.point_to_type === POINT_TO.TREES){
      return mainPath + nodeViewPath
        .replace(":treeparam", action.point_to_tree.uid)
        .replace(":nodeparam", action.point_to_tree.uid && action.point_to_tree.first_node.uid)
    }else if (nodeViewPath && (action.point_to_type === POINT_TO.CONTENT_NODE || action.point_to_type === POINT_TO.LOGIC_NODE) ){
      return mainPath + nodeViewPath
        .replace(":treeparam", treeparam)
        .replace(":nodeparam", action.point_to_node.uid)
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
            <h1 className="pb-2">{ item.node_name }</h1>
            <p className="pb-2" dangerouslySetInnerHTML={{ __html: item.content_area }} />
            <div>
              <h3 className="pb-4 text-primary">{ item.question && item.question }</h3>
              { item.actions.map((action, i) =>
                (item.display_style === "BUTTON"
                  ? <div key={ action.id }>
                    <Button
                      className="btn mt-4 mr-2"
                      color="primary"
                      disabled={ action.point_to_type === POINT_TO.NOTHING }
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
                    disabled={ action.point_to_type === POINT_TO.NOTHING }
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
