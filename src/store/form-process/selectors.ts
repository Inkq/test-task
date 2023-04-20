import { State } from "../../types";
import { NameSpace } from "../../consts";

import { FormData } from "../../types";

export const getFormData = (state: State): FormData => state[NameSpace.FormProcess].formData;
