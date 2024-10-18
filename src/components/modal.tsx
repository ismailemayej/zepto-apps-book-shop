import { useState } from "react";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      {showModal && (
        <div className="modal z-10">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>Modal content goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
