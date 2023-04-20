import { store } from "./store";

export type FormData = {
  name: string;
  surname: string;
  age: string;
  city: string;
}

export type TableRowData = {
  name: string;
  surname: string;
  age: string;
  city: string;
}

export type TableRow = {
  id: string,
  data: TableRowData;
}

export type TTable = {
  id: string,
  deletion: boolean,
  copy: boolean;
  rows: TableRow[];
}

export type Modal = {
  isOpen: boolean;
}

export type TableCurrentRow = {
  id: {
    tableId: string,
    rowId: string
  },
  data: FormData
}

export type FormProcess = {
  formData: FormData;
}

export type GlobalProcess = {
  modal: Modal;
}

export type TableProcess = {
  tables: TTable[];
  currentRow: TableCurrentRow
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;