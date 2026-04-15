import { atomWithStorage } from "jotai/utils";
import type { User } from "@/lib/types/user";

export const tokenAtom = atomWithStorage<string | null>("auth_token", null);
export const userAtom = atomWithStorage<User | null>("auth_user", null);
