import { createApp } from "vue";
import { VuelidatePlugin } from "@vuelidate/core";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import components from "@/components/UI/";
import components_primevue from "@/components/components_primevue";

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primeicons/primeicons.css";
import "@/assets/styles/main.scss";

const app = createApp(App);

[...components, ...components_primevue].forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(router).use(VuelidatePlugin).use(PrimeVue).mount("#app");
