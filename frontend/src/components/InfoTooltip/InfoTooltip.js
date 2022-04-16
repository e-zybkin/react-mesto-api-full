import tick from '../../images/tick.svg'
import cross from '../../images/cross.svg'
import Popup from "../Popup/Popup";

function InfoTooltip({isOpen, onClose, ...props}) {
  return(
    <Popup isOpen={isOpen} name="info" onClose={onClose} content={true}>
      <img className="popup__info-pic" src={props.isAccessSuccess? tick : cross} alt="Галочка" />
      <h3 className="popup__title">{props.isAccessSuccess? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h3>
    </Popup>
  )
}

export default InfoTooltip;
