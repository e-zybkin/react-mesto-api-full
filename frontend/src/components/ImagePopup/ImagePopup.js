import Popup from "../Popup/Popup";

function ImagePopup({isOpen, onClose, ...props}) {
  return(
    <Popup isOpen={isOpen} name="picture" onClose={onClose} content={false}>
      <img className="popup__picture-image"
        src={props.card ? props.card.link : ''}
        alt={props.card.name}
      />
			<p className="popup__picture-caption">{props.card.name}</p>
    </Popup>
  )
}

export default ImagePopup;
