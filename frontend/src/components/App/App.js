import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ImagePopup from '../ImagePopup/ImagePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup';
import api from '../../utils/api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth'


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoToolPopupOpen, setIsInfoToolPopupOpen] = React.useState(false);
  const [isAccessSuccess, setIsAccessSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const navigate = useNavigate();

  React.useEffect(() => {
    api.getUserData()
      .then(result => {
        setCurrentUser(result.data);
      })
      .catch(error => {
        console.log('ОШИБКА: ', error)
      })
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(result => {
        setCards(result.data)
      })
      .catch(error => {
        console.log('ОШИБКА: ', error)
      })
  }, [])

  React.useEffect(() => {
    if(localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt)
      .then((res) => {
        if(res){
          setEmail(res.data.email)
          setLoggedIn(true)
          navigate('/');
        }
      })
      .catch(error => {
        console.log('ОШИБКА: ', error)
      })
    }
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteButtonClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true)
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(error => {
        console.log('ОШИБКА: ', error);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
      .then(result => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups();
      })
      .catch(error => {
        console.log('ОШИБКА: ', error);
      })
  }

  function handleUpdateUser(formData) {
    api.setUserData(formData)
      .then(result => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch(error => {
        console.log('ОШИБКА: ', error);
      })
  }

  function handleUpdateAvatar(formData) {
    api.setUserAvatar(formData)
      .then(result => {
        setCurrentUser(result.data);
        closeAllPopups();
      })
      .catch(error => {
        console.log('ОШИБКА: ', error);
      })
  }

  function handleAddCard(formData) {
    api.setNewCard(formData)
      .then(result => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.log('ОШИБКА: ', error);
      })
  }

  function handleLogin(formData) {
    auth.authorize(formData.password, formData.mail)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setEmail(formData.mail);
        navigate('/');
      })
      .catch((err) => {
        console.log('ОШИБКА: ', err);
        setIsAccessSuccess(false);
        setIsInfoToolPopupOpen(true)
      })
  }

  function handleRegister(formData) {
    auth.register(formData.password, formData.mail)
      .then((res) => {
        setIsAccessSuccess(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log('ОШИБКА: ', err);
        setIsAccessSuccess(false);
      })
      .finally(() => {
        setIsInfoToolPopupOpen(true);
      })
  }

  function signOut() {
    localStorage.removeItem('jwt');
	  setCurrentUser();
	  setLoggedIn(false);
    setEmail('');
  }

  return (
    <div className="page">
      <div className="wrapper">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            email={email}
            onClick={signOut}
          />
          <Routes>

            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onDeleteButton={handleDeleteButtonClick}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path='/sign-up'
              element={
                <Register
                  handleRegister={handleRegister}
                />
              }
            />

            <Route
              path='/sign-in'
              element={
                <Login
                  handleLogin={handleLogin}
                />
              }
            />

            <Route
              path='/'
              element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <DeleteCardPopup
            card={selectedCard}
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
          />

          <InfoTooltip
            isOpen={isInfoToolPopupOpen}
            onClose={closeAllPopups}
            isAccessSuccess={isAccessSuccess}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
