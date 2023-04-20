import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts";
import { GlobalProcess } from "../../types";

const initialState: GlobalProcess = {
  modal: {
    isOpen: false,
  }
};

export const globalProcess = createSlice({
  name: NameSpace.GlobalProcess,
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal.isOpen = true;
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
    },
  },

});

export const { openModal, closeModal } = globalProcess.actions;