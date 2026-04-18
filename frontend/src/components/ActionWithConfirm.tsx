import React, { useState } from "react"
import ConfirmationModal, { ConfirmationModalProps } from "./ConfirmationModal"

interface ActionWithConfirmProps {
  children: React.ReactElement<{ onClick?: () => void }>
  confirmModalProps: Omit<
    ConfirmationModalProps,
    "open" | "onConfirm" | "onCancel"
  >
  onConfirm?: () => void
}

const ActionWithConfirm: React.FC<ActionWithConfirmProps> = ({
  children,
  confirmModalProps,
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    onConfirm?.()
    setIsOpen(false)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      <ConfirmationModal
        open={isOpen}
        {...confirmModalProps}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}

export default ActionWithConfirm
