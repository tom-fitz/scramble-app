import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";

// Prime Vue imports
import "primevue/resources/themes/tailwind-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Password from "primevue/password";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";

import { initializeApp, FirebaseOptions } from "firebase/app";
import { Vue } from "vue-demi";

const geoLocation = require("geolocation");
console.log("geo: ", geoLocation.getCurrentPosition);

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

initializeApp(firebaseConfig);

const pinia = createPinia();

createApp(App)
  .use(PrimeVue)
  .use(pinia)
  .use(router)
  .component("InputText", InputText)
  .component("StandardCard", Card)
  .component("PasswordInput", Password)
  .component("p-button", Button)
  .component("p-dropdown", Dropdown)
  .mount("#app");
