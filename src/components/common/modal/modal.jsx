import React from 'react';
import ReactModal from 'react-modal';

import SvgIcon from '../svgIcon/svgIcon';

const Modal = ({ isOpen, children, close }) => {
  return (
    <div>
      <ReactModal
        bodyOpenClassName="overflow-y-hidden"
        overlayClassName="grid place-items-center fixed inset-0 bg-[#1a1b1e]/60 z-[100]"
        className="bg-white relative max-w-lg w-full rounded outline-none"
        isOpen={isOpen}
        closeTimeoutMS={200}
        ariaHideApp={false}
        onRequestClose={close}
      >
        {children && (
          <div className="px-9 py-8">
            {children}
            <button className="absolute top-2 right-2 flex items-center justify-center w-10 h-10" onClick={close}>
              <SvgIcon name='close' size='24' className='text-black' />
            </button>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default Modal;
