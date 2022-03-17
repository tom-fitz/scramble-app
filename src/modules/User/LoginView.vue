<template>
  <StandardCard>
    <template #content>
      <span>
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" />
      </span>
      <span>
        <label for="password">Password</label>
        <PasswordInput v-model="user.password"> </PasswordInput>
      </span>
      <span>
        <p-button :loading="!loading" label="Submit" @click="login()"
          >Submit</p-button
        >
      </span>
    </template>
  </StandardCard>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { userStore } from "./store/index";
import { User } from "./User";

const store = userStore();

const loading = reactive({ loading: store.loading });

const user = ref({
  email: "",
  password: "",
});

const login = (): void => {
  const loginUser: User = {
    email: user.value.email,
    password: user.value.password,
  };
  store.loginUser(loginUser);
  console.log("store: ", store.user);
};
</script>
