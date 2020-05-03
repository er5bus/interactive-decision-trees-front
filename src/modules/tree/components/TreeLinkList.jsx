import React from 'react'
import { Link } from "react-router-dom"
import userRoutes from "./../../../routes/user"

import { useTranslation } from "react-i18next"


const TreeLinkList = () => {

  const { t } = useTranslation()

  return (
    <div className="btn-wrapper">
      <Link
        className="btn-icon mb-3 mb-sm-0 btn btn-info"
        to={ userRoutes.path + userRoutes.routes.treeList.path }
      >
        <span className="btn-inner--icon mr-1">
          <i className="fas fa-tree" />
        </span>
        <span className="btn-inner--text">{t('Back to Tree List')}</span>
      </Link>
    </div>
  )
}


export default TreeLinkList
