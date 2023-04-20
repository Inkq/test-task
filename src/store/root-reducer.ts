import { combineReducers } from "@reduxjs/toolkit";
import { formProcess } from "./form-process/form-process";
import { tableProcess } from "./table-process/table-process";
import { globalProcess } from "./global-process/global-process";
import { NameSpace } from "../consts";


export const rootReducer = combineReducers({
  [NameSpace.FormProcess]: formProcess.reducer,
  [NameSpace.TableProcess]: tableProcess.reducer,
  [NameSpace.GlobalProcess]: globalProcess.reducer,
});
