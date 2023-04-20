import { NameSpace } from "../../consts";
import { State } from "../../types";

export const getModalStatus = (state: State): boolean => state[NameSpace.GlobalProcess].modal.isOpen;