import { atom } from "jotai";

export type AuthView = "sign-in" | "sign-up";

export const authModalOpenAtom = atom(false);
export const authModalViewAtom = atom<AuthView>("sign-in");
