import { ReactNode } from "react";
import { useAppDispatch } from "../../hooks/store";
import { closeModal } from "../../store/global-process/global-process";
import "./modal-window.scss";

type ModalWindowProps = {
  children: ReactNode;
  active: boolean;
}

export default function ModalWindow({ children, active }: ModalWindowProps) {
  const dispatch = useAppDispatch();

  return (
    <div className={active ? "modal-window modal-window--active" : "modal-window"} onClick={() => dispatch(closeModal())}>
      <div className="modal-window__content" onClick={(e) => e.stopPropagation()}>
        <div onClick={() => dispatch(closeModal())} className="modal-window__button">
          <svg className="modal-window__icon">
            <use xlinkHref="/icons-sprite.svg#icon-x"></use>
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
}