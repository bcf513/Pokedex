import { ReactNode } from "react";
import "./Modal.modules.css";

function Modal({
  // modalOpen,
  onClose,
  children,
}: {
  // modalOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  // if (modalOpen)
  return (
    <>
      <div onClick={() => onClose()} className="modal-background">
        <div onClick={(e) => e.stopPropagation()} className="modal-content">
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
