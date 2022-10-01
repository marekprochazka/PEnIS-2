import { inject } from "vue";
import { TRANSLATOR } from "@/injections";
import type { IUser } from "@/interfaces";
import { auth } from "@/firebase";
import { where } from "firebase/firestore";
import type { QueryConstraint } from "@firebase/firestore";
import type { TQueryFilter } from "@/types";

export const loadTranslator = () => {
  return inject(TRANSLATOR) ?? ((value: string) => `ERROR: ${value}`);
};

export const getUserCredentials = (): IUser => {
  const user = auth.currentUser;
  if (user) {
    return {
      username: user.displayName ?? "",
      email: user.email ?? "",
      profilePicture: user.photoURL ?? "",
    };
  }
  return {
    username: "",
    email: "",
    profilePicture: "",
  };
};

export const generateQueryFilters = (
  params: TQueryFilter[]
): QueryConstraint[] => {
  return params.map((param) => where(...param));
};
