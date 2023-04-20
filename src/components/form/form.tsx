import "./form.scss";
import Button from "../button/button";
import DropDownMenu from "../dropdown-menu/dropdown-menu";
import FormField from "../form-field/form-field";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormData } from "../../types";
import { memo } from 'react';

enum ValueType {
  OnlyNumbers = "onlyNumbers",
  OnlyLetters = "onlyLetters",
}

type FormProps = {
  useFormHook: () => (FormData | Dispatch<SetStateAction<FormData>>)[] | (FormData | ((obj: FormData) => void))[];
  buttonText: string;
  className: string;
}

export default memo(function Form({ useFormHook, buttonText, className }: FormProps) {
  const [form, setForm, handleSubmit] = useFormHook() as [FormData, Dispatch<SetStateAction<FormData>> | ((obj: FormData) => void), ((obj: FormData) => void)];
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    if (!Object.values(form).some((element) => element === "")) {
      setIsBlocked(false);
    } else {
      setIsBlocked(true)
    }
  }, [form]);

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>, valueType: string) {
    const { value, name } = e.target;

    if ((valueType === ValueType.OnlyNumbers && !/[^0-9.]/g.test(value)) || (valueType === ValueType.OnlyLetters && !/[0-9.]/g.test(value))) {
      setForm({ ...form, [name]: value })
    }
  }

  function handleClickDropdown(e: React.MouseEvent<HTMLLIElement>, value: string) {
    e.preventDefault();
    setForm({ ...form, "city": value })
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(form);

    setForm({
      name: "",
      surname: "",
      age: "",
      city: ""
    });
  }

  return (
    <form onSubmit={handleFormSubmit} className={`${className} form`} action="#" method="post">
      <FormField
        className="form__field-wrapper"
        type="text" name="name"
        placeholder="Name"
        required
        handleChangeInput={handleChangeInput}
        value={form.name}
        valueType={ValueType.OnlyLetters}
      />
      <FormField
        className="form__field-wrapper"
        type="text" name="surname"
        placeholder="Surname"
        required
        handleChangeInput={handleChangeInput}
        value={form.surname}
        valueType={ValueType.OnlyLetters}
      />
      <FormField
        className="form__field-wrapper"
        type="text" name="age"
        placeholder="Age"
        required
        handleChangeInput={handleChangeInput}
        value={form.age}
        valueType={ValueType.OnlyNumbers}
      />
      <DropDownMenu className="form__dropdown-menu" value={form.city} handleClickDropdown={handleClickDropdown} />
      <Button disabled={isBlocked} className="form__btn" modifier="withBG">{buttonText}</Button>
    </form >
  );
})