import { createStore } from "vuex";
import { loginModule } from "./loginModule";

export default createStore({
  modules: {
    login: loginModule,
  },
});
