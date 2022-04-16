import { useEffect } from "react";

const Popup = ({ isOpen, name, onClose, content, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_others ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={handleOverlay}
    >
      <div className={content ? `popup__content popup__${name}-content` : `popup__${name}-content`}>
        <button
          className='popup__close-btn buttons'
          type='button'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Popup;


