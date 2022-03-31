<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "./store/index";
import { User } from "./User";
import { useRouter } from "vue-router";
import Map from "@/views/Map.vue";
import { AddressEvt, Address } from "@/modules/User/User";
import { RouteNames } from "@/router/routes";

const router = useRouter();

const ProShop = "pro-shop";
const Golfer = "golfer";

interface IUserType {
  type: string;
  display: string;
}

interface Position {
  lat: number;
  lng: number;
}

const newUserType: IUserType = {
  type: "",
  display: "",
};

const user = ref({
  email: "",
  password: "",
  selectedUserType: newUserType,
  address: {} as Address,
});

const userTypeOptions = ref([
  { type: Golfer, display: "Golfer" },
  { type: ProShop, display: "Pro-Shop" },
]);

const store = userStore();

const addressSelect = (value: AddressEvt) => {
  console.log({ value });
  user.value.address = value;
};

const register = () => {
  const newUser = new User();
  newUser.email = user.value.email;
  newUser.password = user.value.password;
  newUser.userType = user.value.selectedUserType.type;
  newUser.address = user.value.address;
  store.registerUser(newUser).then(() => {
    router.push({
      name: RouteNames.ProShop.Dashboard,
    });
  });
};
</script>

<template>
  <StandardCard>
    <template #content>
      <span class="p-float-label">
        <label for="email">Email</label>
        <InputText id="email" type="email" v-model="user.email" />
      </span>
      <span class="p-float-label">
        <label for="password">Password</label>
        <PasswordInput type="password" v-model="user.password">
          <!-- <template #header>
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
          </template> -->
        </PasswordInput>
      </span>
      <span class="p-float-lbael">
        <p-dropdown
          v-model="user.selectedUserType"
          :options="userTypeOptions"
          optionLabel="display"
          placeholder="Select user type"
        ></p-dropdown>
      </span>
      <span class="p-float-label">
        <Map v-on:address-select="addressSelect" :isInputOnly="false" />
      </span>
      <span class="p-float-label">
        <p-button label="Submit" @click="register()">Register</p-button>
      </span>
    </template>
  </StandardCard>
</template>
