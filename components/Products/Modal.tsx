import React, { ReactNode, useState, useEffect } from "react";
import styles from "../../src/app/page.module.css";
import { useDispatch } from "react-redux";
import { setmodal } from "Redux/modalSlice";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false); // Reset closing state when modal opens
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    dispatch(setmodal(true))
    setTimeout(() => dispatch(setmodal(false)), 400); // Match the animation duration
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={`${styles.modal} ${
          isClosing ? styles.slideDown : styles.slideUp
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
