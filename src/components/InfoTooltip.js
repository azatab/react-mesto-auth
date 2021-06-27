import React from 'react'
import PopupWithoutForm from './PopupWithForm'

const InfoTooltip = ({message, ...rest}) => {
  return (
    <PopupWithoutForm
      name = {'auth'}
      {...rest}
    >
      <img src={message.image} alt="Статус авторизации" className="popup__tooltip-image" />
      <p className="popup__tooltip-text">{message.text}</p>
    </PopupWithoutForm>    
  )
}

export default InfoTooltip