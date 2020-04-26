import React from 'react'
import { Link } from "react-router-dom"
import userRoutes from "./../../../routes/user"

import { useTranslation } from "react-i18next"


export default ({ treeparam }) => {

  const { t } = useTranslation()

  return (
    <div className="btn-wrapper">
      <Link
        className="btn-icon mb-3 mb-sm-0 btn btn-info"
        to={ userRoutes.path + userRoutes.routes.nodeList.path.replace(":param", treeparam) }
      >
        <span className="btn-inner--icon mr-1">
          <i className="fas fa-sitemap" />
        </span>
        <span className="btn-inner--text">{t('Back to Node List')}</span>
      </Link>
    </div>
  )
}
