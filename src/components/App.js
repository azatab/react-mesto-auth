import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import React from 'react'
import api from '../utils/api'
import auth from '../utils/auth'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmationPopup from './ConfirmationPopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [cardToDelete, setCardToDelete] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(true)
  const [message, setMessage] = React.useState({
    text: '',
    image: ''
  })

  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])
    .then(([cardsObj, userData]) => {
      setCards(cardsObj)
      setCurrentUser(userData)
    })
    .catch((err) => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id)
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards(state => state.map(c => c._id === card._id ? newCard : c))
    })
    .catch((err) => console.log(err))
  }

  function handleCardDeleteSubmit(e) {
    e.preventDefault()
    api.deleteCard(cardToDelete._id)
    .then(() => {
      setCards(state => state.filter(c => c._id !== cardToDelete._id))
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }
  
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    //console.log(e)
    // if (e.target === e.currentTarget || e.key === 'Escape') {
      setEditProfilePopupOpen(false)
      setAddPlacePopupOpen(false)
      setEditAvatarPopupOpen(false)
      setConfirmationPopupOpen(false)
      setInfoTooltipOpen(false)
      setSelectedCard({})
    //}
  }

  function handleUpdateUser (inputValues) {
    api.setUserInfo(inputValues)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.log(`Ошибка - ${err}`))
  }

  function handleUpdateAvatar (inputValue) {
    api.setUserAvatar(inputValue)
    .then(data => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit (place) {
    api.loadCard(place)
    .then(data => {
      setCards([data, ...cards])
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleCardDelete (card) {
    setConfirmationPopupOpen(true)
    setCardToDelete(card)
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value = {currentUser}>
          <Header />
          <Switch>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {loggedIn 
                ? <ProtectedRoute 
                    loggedIn = {loggedIn} 
                    component = {Main} 
                    onEditProfile = {handleEditProfileClick}
                    onAddPlace = {handleAddPlaceClick}
                    onEditAvatar = {handleEditAvatarClick}
                    onCardClick = {handleCardClick}
                    cards = {cards}
                    onCardLike = {handleCardLike}
                    onCardDelete = {handleCardDelete}/> 
                : <Redirect to = "/sign-in" />}
            </Route>
            {/* <Main 
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              onCardClick = {handleCardClick}
              cards = {cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
              /> */}
            <Route path="*">
              <Login />
            </Route>
          </Switch>
          <Footer />
          
          <EditProfilePopup 
            isOpen = {isEditProfilePopupOpen} 
            onClose = {closeAllPopups}
            onUpdateUser = {handleUpdateUser} 
          />

          <EditAvatarPopup 
            isOpen = {isEditAvatarPopupOpen} 
            onClose = {closeAllPopups} 
            onUpdateAvatar = {handleUpdateAvatar}
          />

          <AddPlacePopup 
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            onAddPlace = {handleAddPlaceSubmit}
          />

          <ConfirmationPopup 
            isOpen = {isConfirmationPopupOpen}
            onClose = {closeAllPopups}
            onSubmit = {handleCardDeleteSubmit}
          />
          
          <ImagePopup 
            card={selectedCard} 
            onClose={closeAllPopups}
          />

          <InfoTooltip 
            isOpen = {isInfoTooltipOpen}
            onClose = {closeAllPopups}
            message = {message}
          />
        </CurrentUserContext.Provider>        
      </div>
    </div>
  );
}

export default App;