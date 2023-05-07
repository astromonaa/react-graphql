import { FC } from "react";

interface IProps {
  children: React.ReactNode | React.ReactChild;
  openModal: (bool: boolean) => void;
  setModalContent: (component: any) => void;
}

const Modal: FC<IProps> = ({ children, openModal, setModalContent }) => {
  
  const onClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target.dataset.target) {
      openModal(false);
      setModalContent(null);
    }
  };

  return (
    <div className="modal" onClick={onClose} data-target>
      <div className="modal-content">
        <div
          style={{ position: "absolute", right: "15px", cursor: "pointer" }}
          onClick={onClose}
          data-target
        >
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
