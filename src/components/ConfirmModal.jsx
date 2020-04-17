import React from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import { useTranslation } from "react-i18next"


export default ({ title, content, onToggle, onClick, buttonText }) => {

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