import { ReactNode } from "react";
import "./button.scss";

enum ButtonModifier {
  withBG = "withBG",
  withoutBG = "withoutBG"
}

type ButtonProps = {
  children: ReactNode;
  className: string;
  modifier?: keyof typeof ButtonModifier;
  disabled: boolean;
  onClick?: () => void;
}

export default function Button({ children, className, modifier, disabled, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={`${className} btn ${modifier && `btn--${modifier}`}`}>{children}</button>
  );
}