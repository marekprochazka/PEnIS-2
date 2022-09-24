import { defineStore } from "pinia";
import type { IUser } from "@/interfaces";

export const useUserStore = defineStore({
  id: "user",
  state: (): IUser => ({
    username: "",
    email: "",
    profilePicture: "",
  }),
  getters: {
    getUser(state): IUser {
      return state;
    },
  },
  actions: {
    setUser(user: IUser) {
      this.username = user.username;
      this.email = user.email;
      this.profilePicture = user.profilePicture;
    },
    clearUser() {
      this.username = "";
      this.email = "";
      this.profilePicture = "";
    },
    isUserEmpty(): boolean {
      return this.username === "";
    },
  },
});
