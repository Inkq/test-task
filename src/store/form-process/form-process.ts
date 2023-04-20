import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts";
import { FormProcess, FormData } from "../../types";

const initialState: FormProcess = {
  formData: {
    name: "",
    surname: "",
    age: "",
    city: ""
  },
};

export const formProcess = createSlice({
  name: NameSpace.FormProcess,
  initialState,
  reducers: {
    changeFormData: (state, action: PayloadAction<FormData>) => {
      state.formData = action.payload;
    },
  },

});

export const { changeFormData } = formProcess.actions;