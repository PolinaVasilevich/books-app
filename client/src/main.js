import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { VuelidatePlugin } from "@vuelidate/core";
import { Datetime } from "vue-datetime";

import components from "@/components/UI/";

import "vue-datetime/dist/vue-datetime.css";
import "@/assets/styles/main.scss";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.component("datetime", Datetime);

app.use(store).use(router).use(VuelidatePlugin).use(Datetime).mount("#app");
