import { State, ValidationError } from "../../types";
import { NameSpace } from "../../consts";

import { FormData } from "../../types";

export const getFormData = (state: State): FormData => state[NameSpace.FormProcess].formData;
export const getValidationError = (state: State): ValidationError => state[NameSpace.FormProcess].validationError;
