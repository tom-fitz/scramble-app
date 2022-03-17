<template>
  <StandardCard>
    <template #content>
      <span class="p-float-label">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" />
      </span>
      <div class="field">
        <div class="p-float-label">
          <PasswordInput
            id="password"
            v-model="v$.password.$model"
            :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            toggleMask
          >
            <template #header>
              <h6>Pick a password</h6>
            </template>
            <template #footer="sp">
              {{ sp.level }}
              <Divider />
              <p class="mt-2">Suggestions</p>
              <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
              </ul>
            </template>
          </PasswordInput>
          <label
            for="password"
            :class="{ 'p-error': v$.password.$invalid && submitted }"
            >Password*</label
          >
        </div>
        <small
          v-if="
            (v$.password.$invalid && submitted) ||
            v$.password.$pending.$response
          "
          class="p-error"
          >{{
            v$.password.required.$message.replace("Value", "Password")
          }}</small
        >
      </div>
      <!-- <span class="p-float-label">
        <label for="password">Password</label>
        <PasswordInput v-model="user.password">
          <template #header>
            <h6>Pick a password</h6>
          </template>
          <template #footer>
            <Divider />
            <p class="mt-2">Suggestions</p>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one numeric</li>
              <li>Minimum 8 characters</li>
            </ul>
          </template>
        </PasswordInput>
      </span> -->
      <span class="p-float-lbael">
        <p-dropdown
          v-model="user.selectedUserType"
          :options="userTypeOptions"
          optionLabel="display"
          placeholder="Select user type"
        ></p-dropdown>
      </span>
      <span class="p-float-label">
        <p-button label="Submit" @click="register()">Register</p-button>
      </span>
    </template>
  </StandardCard>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { userStore } from "./store/index";
import { User } from "./User";
import { useVuelidate, ValidationArgs } from '@vuelidate/core';
import { email, required } from "@vuelidate/validators";

interface Form {
  name: "",
  email: "",
  password: "",
}

const user = ref({
  email: "",
  password: "",
  selectedUserType: "",
});

const userTypeOptions = ref([
  { type: "golfer", display: "Golfer" },
  { type: "pro shop", display: "Pro-Shop" },
]);

const store = userStore();

const state: Form = reactive({
    name: '',
    email: '',
    password: '',
});

const rules: ValidationArgs = {
    name: { required },
    email: { required, email },
    password: { required },
};

const v$ = useVuelidate<ValidationArgs>(rules, state);

const register = () => {
  const newUser = new User();
  newUser.email = user.value.email;
  newUser.password = user.value.password;
  newUser.userType = user.value.selectedUserType;
  store.registerUser(newUser);
};
</script>
