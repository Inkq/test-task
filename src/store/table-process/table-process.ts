import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace } from "../../consts";
import { TableProcess, FormData, TTable } from "../../types";

const rootTable = {
  id: nanoid(),
  deletion: false,
  copy: true,
  rows: []
};

const initialState: TableProcess = {
  tables: [rootTable],
  currentRow: {
    id: {
      tableId: "",
      rowId: ""
    },
    data: {
      name: "",
      surname: "",
      age: "",
      city: ""
    },
  }
};

export const tableProcess = createSlice({
  name: NameSpace.TableProcess,
  initialState,
  reducers: {
    copyTable: {
      reducer: (state, action: PayloadAction<Omit<TTable, "rows">>) => {
        state.tables.push({ ...state.tables[0], ...action.payload });
      },
      prepare: () => {
        const id = nanoid();
        return { payload: { id: id, deletion: true, copy: false } };
      },
    },

    removeTable: (state, action: PayloadAction<string>) => {
      state.tables = state.tables.filter((table) => table.id !== action.payload);
    },

    removeRow: (state, action: PayloadAction<{ tableId: string, rowId: string }>) => {
      const targetIndex = state.tables.findIndex((table) => table.id === action.payload.tableId);
      state.tables[targetIndex].rows = state.tables[targetIndex].rows.filter((row) => row.id !== action.payload.rowId);
    },

    addRow: {
      reducer: (state, action: PayloadAction<{ id: string, data: FormData }>) => {
        state.tables[0].rows.push({ id: action.payload.id, data: action.payload.data });
      },
      prepare: (formData) => {
        const rowId = nanoid();
        return { payload: { id: rowId, data: formData } };
      },
    },

    editRow: (state, action: PayloadAction<{ rowId: string, tableId: string, data: FormData }>) => {
      const targetIndex = state.tables.findIndex((table) => table.id === action.payload.tableId);
      const rowIndex = state.tables[targetIndex].rows.findIndex((row) => row.id === action.payload.rowId);
      state.tables[targetIndex].rows[rowIndex].data = action.payload.data;
    },

    sendRowData: (state, action: PayloadAction<{ tableId: string, rowId: string, data: FormData }>) => {
      state.currentRow.id = { tableId: action.payload.tableId, rowId: action.payload.rowId };
      state.currentRow.data = action.payload.data;
    },
  }
});

export const { copyTable, removeTable, removeRow, addRow, editRow, sendRowData } = tableProcess.actions;