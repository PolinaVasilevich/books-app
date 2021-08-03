import { createApp } from "vue";
import { VuelidatePlugin } from "@vuelidate/core";
import PrimeVue from "primevue/config";

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import components from "@/components/UI/";

import "@/assets/styles/main.scss";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.component("Dialog", Dialog);
app.component("Button", Button);

app.use(store).use(router).use(VuelidatePlugin).use(PrimeVue).mount("#app");
