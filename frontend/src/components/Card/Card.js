import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.ownerId === currentUser._id;
  const isLiked = props.likes.some(i => i === currentUser._id);
  const cardDeleteButtonClassName = (
    `elements-grid__delete-button ${isOwn ? 'elements-grid__delete-button_visible buttons' : ''}`
  );
  const cardLikeButtonClassName = (
    `elements-grid__like-button ${isLiked ? 'elements-grid__like-button_activated' : ''}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteButtonClick() {
    props.onDeleteButton(props.card);
  }

  return(
    <article className="elements-grid__element">
      <button type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteButtonClick}
      ></button>
      <img className="elements-grid__pic"
        onClick={handleClick}
        src={props.link}
        alt={props.name}
      />
      <div className="elements-grid__group">
        <h2 className="elements-grid__caption">{props.name}</h2>
        <div className="elements-grid__likes">
          <button type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="elements-grid__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
