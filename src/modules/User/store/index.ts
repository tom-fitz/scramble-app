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
    user: {},
  }),
  getters: {
    [Get.GetUser]: (state) => state.user,
  },
  actions: {
    async registerUser(user: User): Promise<void> {
      this.resetMessages();
      this.loading = true;
      try {
        const newUser = await api.registerUser(user);
        user.id = newUser.uid;
        api.addUser(user);
        this.user = Object.assign({}, user);
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
  },
});
