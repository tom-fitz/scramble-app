<script setup lang="ts">
import { userStore } from "./store/index";
import { User } from "./User";

const store = userStore();

const currentUser = store.GetUser as User;

const logout = () => {
  store.signOutUser(currentUser);
};
</script>
<template>
  <p-button @click="logout()">Logout</p-button>
</template>
