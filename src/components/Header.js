import React from 'react'
import logo from '../images/logo-vect.svg';

function Header() {
  return (
    <header className="header page__section">
          <img className="header__logo" src={logo} alt="Место Россия" />
    </header>
  )
}

export default Header