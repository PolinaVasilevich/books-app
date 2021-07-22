<template>
  <form @submit.prevent class="form">
    <h1>Login</h1>
    <div v-if="status" class="input-errors">
      <div class="error-msg">{{ status }}</div>
    </div>
    <input
      class="form__input"
      :class="{ 'input-error': v$.user.username.$errors.length }"
      v-model.trim="user.username"
      type="text"
      placeholder="Enter your username"
    />

    <div v-for="error of v$.user.username.$errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>

    <input
      class="form__input"
      :class="{ 'input-error': v$.user.password.$errors.length }"
      v-model.trim="user.password"
      type="password"
      placeholder="Enter your password"
    />

    <div v-for="error of v$.user.password.$errors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>

    <my-button @click="checkForm" class="form__btn">Login</my-button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapState } from "vuex";

import "@/assets/styles/loginForm.scss";

export default {
  name: "login-form",
  setup() {
    return { v$: useVuelidate() };
  },

  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    checkForm() {
      this.v$.user.$touch();
      if (!this.v$.user.$error) {
        this.$emit("login", this.user);
      }
    },
  },

  computed: {
    ...mapState("login", {
      status: (state) => state.status,
    }),
  },

  validations() {
    return {
      user: {
        username: {
          required,
        },
        password: {
          required,
        },
      },
    };
  },
};
</script>
