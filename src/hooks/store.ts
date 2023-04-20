import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import { State, AppDispatch } from "../types";

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
