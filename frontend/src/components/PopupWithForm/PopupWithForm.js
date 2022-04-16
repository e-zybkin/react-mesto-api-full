import Popup from "../Popup/Popup";

function PopupWithForm({isOpen, name, onClose, ...props}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose} content={true}>
      <h3 className='popup__title'>{props.title}</h3>
      <form
        className={`popup__form popup__form_type_${name}`}
        name={name}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button type="submit" className="popup__save-btn">{props.submitText}</button>
			</form>
    </Popup>
  )
}

export default PopupWithForm;
