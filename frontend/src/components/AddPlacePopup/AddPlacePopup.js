import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name,
      link,
    });
  }

  return(
    <PopupWithForm
      name="card"
      title="Новое место"
      submitText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="input-box">
        <input
          required
          minLength="2"
          maxLength="30"
          type="text"
          value={name || ''}
          onChange={handleNameChange}
          placeholder="Название"
          id="place-input"
          className="popup__input popup__input_type_title"
          name="name"
        />
        <span className="popup__input-error place-input-error"></span>
			</div>

  		<div className="input-box">
        <input
          required
          type="url"
          value={link || ''}
          onChange={handleLinkChange}
          placeholder="Ссылка на картинку"
          id="pic-input"
          className="popup__input popup__input_type_pic"
          name="link"
        />
        <span className="popup__input-error pic-input-error"></span>
			</div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
