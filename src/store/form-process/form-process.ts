import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts";
import { FormProcess, FormData, ValidationError } from "../../types";

const initialState: FormProcess = {
  formData: {
    name: "",
    surname: "",
    age: "",
    city: ""
  },

  validationError: {
    name: "",
    surname: "",
    age: ""
  }
};

export const formProcess = createSlice({
  name: NameSpace.FormProcess,
  initialState,
  reducers: {
    changeFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
    setFormValidationError: (state, action: PayloadAction<ValidationError>) => {
      state.validationError = action.payload;
    }
  },

});

export const { changeFormData, setFormValidationError } = formProcess.actions;