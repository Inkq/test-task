import { useState } from "react";
import { FormData, ValidationError } from "../types";
import { editRow } from "../store/table-process/table-process";
import { useAppDispatch, useAppSelector } from "./store";
import { getCurrentRowData } from "../store/table-process/selectors";
import { closeModal } from "../store/global-process/global-process";

export default function useTableEditForm() {
  const dispatch = useAppDispatch();
  const currentRowData = useAppSelector(getCurrentRowData);

  const [form, setForm] = useState<FormData>(currentRowData.data);
  const [validationError, setFormValidationError] = useState<ValidationError>({ name: "", surname: "", age: "" });

  function handleSubmit(formData: FormData) {
    dispatch(editRow({ rowId: currentRowData.id.rowId, tableId: currentRowData.id.tableId, data: formData }));
    dispatch(closeModal());
  }

  function setValidationError(errorObj: ValidationError) {
    setFormValidationError(errorObj);
  }

  return [form, setForm, handleSubmit, setValidationError, validationError];
}