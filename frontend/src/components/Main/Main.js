import React from "react";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <>
      <main>
			<section className="profile">
				<div className="profile__cover" onClick={props.onEditAvatar}>
			    <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка профиля" />
				</div>
				<div className="profile__info">
				  <h1 className="profile__name">{currentUser.name}</h1>
				  <button type="button" onClick={props.onEditProfile} className="profile__edit-button buttons"></button>
				  <p className="profile__about">{currentUser.about}</p>
				</div>
				<button type="button" onClick={props.onAddPlace} className="profile__add-button buttons"></button>
			</section>

			<section className="elements-grid">
        {props.cards.map((card, i) => (
          <Card
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            ownerId={card.owner._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onDeleteButton={props.onDeleteButton}
          />
        ))}
			</section>
		</main>
    <Footer />
    </>
  );
}

export default Main;
