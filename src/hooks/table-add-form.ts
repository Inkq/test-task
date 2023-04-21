import { changeFormData, setFormValidationError } from "../store/form-process/form-process";
import { getFormData, getValidationError } from "../store/form-process/selectors";
import { useAppSelector, useAppDispatch } from "./store";
import { FormData, ValidationError } from "../types";
import { addRow } from "../store/table-process/table-process";

export default function useTableAddForm() {
  const form = useAppSelector(getFormData);
  const validationError = useAppSelector(getValidationError);
  const dispatch = useAppDispatch();

  function setForm(formData: FormData) {
    dispatch(changeFormData(formData));
  }

  function handleSubmit(formData: FormData) {
    dispatch(addRow(formData));
  }

  function setValidationError(errorObj: ValidationError) {
    dispatch(setFormValidationError(errorObj))
  }

  return [form, setForm, handleSubmit, setValidationError, validationError];
}