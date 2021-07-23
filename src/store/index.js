import { createStore } from "vuex";
import { loginModule } from "./loginModule";
import { booksModule } from "./booksModule";

export default createStore({
  modules: {
    login: loginModule,
    books: booksModule,
  },
});
