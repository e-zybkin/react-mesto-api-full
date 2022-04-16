import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
  }

  return(
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      submitText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
