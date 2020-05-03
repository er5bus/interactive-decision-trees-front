import React from "react"
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { useTranslation } from "react-i18next"


const ConfirmModal = ({ title, content, onToggle, onClick, buttonText }) => {

  const { t } = useTranslation()

  return (
    <div>
      <Modal isOpen={true} toggle={onToggle} className="modal-dialog-centered">
        <ModalHeader toggle={onToggle}>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={ () => {
            onClick() 
            onToggle()
          }}>{ buttonText }</Button>{' '}
          <Button color="secondary" onClick={onToggle}>{ t("Close") }</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

ConfirmModal.propTypes = {
  title: PropTypes.string, 
  content: PropTypes.string, 
  onToggle: PropTypes.func, 
  onClick: PropTypes.func, 
  buttonText: PropTypes.string
}

export default ConfirmModal
