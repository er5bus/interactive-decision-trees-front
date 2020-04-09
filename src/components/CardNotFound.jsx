import React from "react"
import { useTranslation } from "react-i18next"

import { Card, CardBody } from "reactstrap"

import emptyIcon from "./../assets/img/empty.png"


export default () => {
  const { t } = useTranslation()

  return (
    <Card className="card-lift--hover shadow">
      <CardBody className="py-5">
        <div className="rounded-circle mb-4">
          <img src={emptyIcon} />
        </div>
        <h6 className="text-primary text-uppercase">
          { t("Oops! no result found") }
        </h6>
        <p className="description mt-3">
          { t("Sorry any inconvenience this may have caused") }
        </p>
      </CardBody>
    </Card>
  )
}
