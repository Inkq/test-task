import { State, TableCurrentRow } from "../../types";
import { NameSpace } from "../../consts";

import { TTable } from "../../types";

export const getTables = (state: State): TTable[] => state[NameSpace.TableProcess].tables;
export const getCurrentRowData = (state: State): TableCurrentRow => state[NameSpace.TableProcess].currentRow;