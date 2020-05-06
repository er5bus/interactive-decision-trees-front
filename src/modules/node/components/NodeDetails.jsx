import React from 'react'
import { Card, CardHeader, Button, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import { useTranslation } from 'react-i18next'
import emptyIcon from "./../../../assets/img/empty.png"

import NodeDetailsLoader from './NodeDetailLoader'


const NodeDetails = ({ item, isLoading, treeparam, nodeViewPath, mainPath, calculateScore=f=>f }) => {

  const { t } = useTranslation()

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
              <h3 className="pb-4 text-primary">{ item.question && item.question } ?</h3>
              { item.actions.map((action, i) =>
                (item.display_style === "BUTTON"
                  ? <div key={ action.point_to.uid + i}>
                    <Button
                      className="btn mt-4 mr-2"
                      color="primary"
                      disabled={ !Boolean(action.point_to.uid) }
                      onClick={() => calculateScore(item, action) }
                      to={ nodeViewPath ? (mainPath + nodeViewPath.replace(":treeparam", treeparam).replace(":nodeparam", action.point_to.uid)) : "#" }
                      tag={Link}
                    >
                      { action.name }
                    </Button>
                  </div>
                  : <Link
                    key={ action.point_to.uid + i}
                    className="panel-link mb-2"
                    onClick={() => calculateScore(item, action) }
                    disabled={ !Boolean(action.point_to.uid) }
                    to={  nodeViewPath ? (mainPath + nodeViewPath.replace(":treeparam", treeparam).replace(":nodeparam", action.point_to.uid)) : "#" }
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
