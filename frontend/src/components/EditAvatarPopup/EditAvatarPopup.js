import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    setAvatar('');
  }, [props.isOpen])

  function handleAvatarChange(e) {
    setAvatar(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      link: avatar,
    })
  }

  return(
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="input-box input-box_type_avatar">
        <input
          required
          type="url"
          value={avatar || ''}
          onChange={handleAvatarChange}
          placeholder="Ссылка на картинку"
          id="avatar-input"
          className="popup__input popup__input_type_avatar"
          name="link"
        />
        <span className="popup__input-error avatar-input-error"></span>
			</div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
