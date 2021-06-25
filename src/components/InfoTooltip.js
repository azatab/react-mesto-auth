import React from 'react'
import PopupWithForm from './PopupWithForm'

const InfoTooltip = ({message, ...rest}) => {
  return (
    <PopupWithForm
      name = {'auth'}
      withSubmit = {false}
      {...rest}
    >
      <img src={message.image} alt="Статус авторизации" className="popup__tooltip-image" />
      <p className="popup__tooltip-text">{message.text}</p>
    </PopupWithForm>    
  )
}

export default InfoTooltip