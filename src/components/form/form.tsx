import "./form.scss";
import Button from "../button/button";
import DropDownMenu from "../dropdown-menu/dropdown-menu";
import FormField from "../form-field/form-field";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormData, ValidationError } from "../../types";
import { memo } from 'react';

enum ValueType {
  OnlyNumbers = "onlyNumbers",
  OnlyLetters = "onlyLetters",
}

type FormProps = {
  useFormHook: () => (ValidationError | ((formData: FormData) => void))[];
  buttonText: string;
  className: string;
}

export default memo(function Form({ useFormHook, buttonText, className }: FormProps) {
  const [form, setForm, handleSubmit, setValidationError, validationError] = useFormHook() as [FormData, Dispatch<SetStateAction<FormData>> | ((obj: FormData) => void), ((obj: FormData) => void), React.Dispatch<React.SetStateAction<ValidationError>> | ((errorObj: ValidationError) => void), ValidationError]
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    if ((!Object.values(form).some((element) => element === "")) && (Object.values(validationError).every((element) => element === ""))) {
      setIsBlocked(false);
    } else {
      setIsBlocked(true)
    }
  }, [form, validationError]);


  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>, valueType: string) {
    const { value, name } = e.target;

    if ((valueType === ValueType.OnlyNumbers && !/[^0-9.]/g.test(value)) || (valueType === ValueType.OnlyLetters && !/[0-9 ]+/g.test(value))) {
      validate(value, name, valueType);
      setForm({ ...form, [name]: value });
    }
  }

  function validate(value: string, name: string, valueType: string) {
    if (valueType === ValueType.OnlyNumbers && (Number(value) < 1)) {
      setValidationError({ ...validationError, [name]: "Must be greater than zero" });
    } else if (valueType === ValueType.OnlyNumbers && Number(value) > 150) {
      setValidationError({ ...validationError, [name]: "Must be less than 150" });
    } else if (valueType === ValueType.OnlyNumbers && value[0] === '0') {
      setValidationError({ ...validationError, [name]: "Incorrect number" });
    } else if (valueType === ValueType.OnlyLetters && value.length < 3) {
      setValidationError({ ...validationError, [name]: "Must contain minimum 3 characters" });
    } else if (valueType === ValueType.OnlyLetters && value.length > 20) {
      setValidationError({ ...validationError, [name]: "Must contain maximum 20 characters" });
    } else {
      setValidationError({ ...validationError, [name]: "" });
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
        autoComplete="off"
        validationError={validationError}
      />
      <FormField
        className="form__field-wrapper"
        type="text" name="surname"
        placeholder="Surname"
        required
        handleChangeInput={handleChangeInput}
        value={form.surname}
        valueType={ValueType.OnlyLetters}
        autoComplete="off"
        validationError={validationError}
      />
      <FormField
        className="form__field-wrapper"
        type="text" name="age"
        placeholder="Age"
        required
        handleChangeInput={handleChangeInput}
        value={form.age}
        valueType={ValueType.OnlyNumbers}
        autoComplete="off"
        validationError={validationError}
      />
      <DropDownMenu className="form__dropdown-menu" value={form.city} handleClickDropdown={handleClickDropdown} />
      <Button disabled={isBlocked} className="form__btn" modifier="withBG">{buttonText}</Button>
    </form >
  );
});