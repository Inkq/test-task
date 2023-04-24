import { useEffect, useState } from "react";
import "./dropdown-menu.scss";
import { CITIES } from "../../consts";

type DropDownMenuProps = {
  className: string;
  value: string;
  handleClickDropdown: (e: React.MouseEvent<HTMLLIElement>, value: string) => void;
}

export default function DropDownMenu({ className, value, handleClickDropdown }: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDocumentClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;

    if (isOpen && !target.closest(".dropdown-menu")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleDocumentClick);
    }

    return () => document.removeEventListener("click", handleDocumentClick);
  });

  return (
    <div className={`${className} dropdown-menu`}>
      <div className="dropdown-menu__input-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <label className="dropdown-menu__label">City</label>
        <input className="dropdown-menu__input" type="text" readOnly placeholder="City" value={value} />
        <svg className={`dropdown-menu__icon ${isOpen ? "dropdown-menu__icon--rotated" : ""}`} width="14" height="14">
          <use xlinkHref="/icons-sprite.svg#icon-arrow" />
        </svg>
      </div>
      {<ul className={`dropdown-menu__options ${isOpen ? "dropdown-menu__options--open" : ""}`}>
        {CITIES.map((city) => (
          <li
            key={city}
            className={`dropdown-menu__option ${value === city ? "dropdown-menu__option--disabled" : ""}`}
            onClick={(e) => { handleClickDropdown(e, city); setIsOpen(false); }}>{city}
          </li>
        ))}
      </ul>}
    </div>
  );
}