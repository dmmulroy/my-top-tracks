import React from 'react';

const Modal = ({ title, onSubmit, onCancel, onClose, open, children }) => {
  // React.useEffect(() => () => onClose(), [onClose]);

  return (
    <div className={open ? 'modal is-active' : 'modal'}>
      <div className='modal-background'></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{title}</p>
          <button className='delete' aria-label='close'></button>
        </header>
        <section className='modal-card-body'>{children}</section>
        <footer className='modal-card-foot'>
          <button className='button is-success' onClick={onSubmit}>
            Okay
          </button>
          <button className='button' onClick={onCancel}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
