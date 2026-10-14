import { configureStore } from "@reduxjs/toolkit";
import progress from "./progressSlice";

export const makeStore = () => configureStore({ reducer: { progress } });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
