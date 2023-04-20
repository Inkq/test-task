import { changeFormData } from "../store/form-process/form-process";
import { getFormData } from "../store/form-process/selectors";
import { useAppSelector, useAppDispatch } from "./store";
import { FormData } from "../types";
import { addRow } from "../store/table-process/table-process";

export default function useTableAddForm() {
  const form = useAppSelector(getFormData);
  const dispatch = useAppDispatch();

  function setForm(formData: FormData) {
    dispatch(changeFormData(formData));
  }

  function handleSubmit(formData: FormData) {
    dispatch(addRow(formData));
  }

  return [form, setForm, handleSubmit];
}