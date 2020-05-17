import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { useTranslation } from "react-i18next"

import { logout } from "./../actions"

import ConfirmModal from "./../../../components/ConfirmModal"


const Logout = ({ logout, openModal, onToggle }) => {
  const { t } = useTranslation()

  return (
    <ConfirmModal
      isOpen={ openModal }
      title={ t("Confirmation") }
      content={ t("Are you sure you want to logout ?") }
      onToggle={onToggle}
      onClick={ logout }
      buttonText={ t("Logout") }
    />
  )
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch)
const mapStateToProps = state => state.auth

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
