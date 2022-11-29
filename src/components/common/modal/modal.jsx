import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ isOpen, children, close }) => {
  return (
    <div>
      <ReactModal
        bodyOpenClassName="overflow-y-hidden"
        overlayClassName="grid place-items-center fixed inset-0 bg-[#1a1b1e]/60 z-[100]"
        className="bg-white relative max-w-lg w-full rounded"
        isOpen={isOpen}
        closeTimeoutMS={200}
        ariaHideApp={false}
        onRequestClose={close}
      >
        {children && (
          <div className="px-9 py-8">
            {children}
            <button className="absolute top-8 right-9" onClick={close}>
              X
            </button>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default Modal;
