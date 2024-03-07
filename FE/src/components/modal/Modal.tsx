"use client"
import React, { useEffect } from "react";
import ReactPortal from "./ReactPortal";
import "./modal.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      e.key === "Escape" ? handleClose() : null;
    };
    document.body.addEventListener("keydown", closeOnEscapeKey);

    return (): void => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    document.body.style.marginRight = `${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
    return (): void => {
      document.body.style.overflow = "unset";
      document.body.style.marginRight = "0px";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="modal-layer fixed top-0 lef-0 inset-0 w-screen z-40 "></div>
        <div className="fixed z-50 flex w-screen justify-center items-center overflow-hidden inset-0">
          <div className="modal-wrap-children w-fit max-w-[90%]">
            {children}
          </div>
        </div>
      </>
    </ReactPortal>
  );
};

export default Modal;
