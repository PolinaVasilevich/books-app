import { createApp } from "vue";
import VuelidatePlugin from "@vuelidate/core";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import BadgeDirective from "primevue/badgedirective";
import VueGoogleMaps from "@fawmi/vue-google-maps";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import components from "@/components/UI/";
import components_primevue from "@/components/components_primevue";

import "./assets/styles/main.scss";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);

[...components, ...components_primevue].forEach((component) => {
  app.component(component.name, component);
});
app.directive("badge", BadgeDirective);

app
  .use(store)
  .use(router)
  .use(VuelidatePlugin)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyAfm1nAFdquZWc1I4Srn1_kmc0K-izNh8s",
    },
  })
  .mount("#app");
