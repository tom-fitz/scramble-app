import api from "./../api";
import { User } from "./../User";
import { defineStore } from "pinia";

export const Get = {
  GetUser: "getUser",
};

export const Action = {
  RegisterUser: "registerUser",
};

export const userStore = defineStore("userStore", {
  state: () => ({
    errorMsg: {} as unknown,
    successMsg: "",
    loading: false,
    user: User as unknown,
  }),
  getters: {
    [Get.GetUser]: (state) => state.user,
  },
  actions: {
    async registerUser(newUser: User): Promise<void> {
      this.resetMessages();
      this.loading = true;
      try {
        const returnedUser = await api.registerUser(newUser);
        newUser.id = returnedUser.uid;
        api.addUser(newUser);
        this.user = newUser;
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
    loginUser(user: User): void {
      this.resetMessages();
      this.loading = true;
      try {
        const returnedUser = api.loginUser(user);
        console.log("returned user: ", returnedUser);
        // const dbUser = api.getUser(returnedUser)
        // this.user: User = {
        //   id: returnedUser.
        // }
        this.successMsg = `Successfully logged in user ${user.email}`;
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
    resetMessages(): void {
      (this.successMsg = ""), (this.errorMsg = "");
    },
    signOutUser(user: User): void {
      this.resetMessages();
      this.loading = true;
      try {
        api.signOutUser();
        this.successMsg = `Successfully logged out user ${user.email}`;
      } catch (err) {
        this.errorMsg = err;
      } finally {
        this.loading = false;
      }
    },
  },
});
