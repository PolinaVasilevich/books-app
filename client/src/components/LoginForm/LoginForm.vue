<template>
  <form @submit.prevent class="form">
    <h1>Login</h1>
    <span v-if="status" class="form__error_msg">{{ status }}</span>
    <div>
      <my-input
        class="form__input"
        :class="{ form__input_error: v$.user.username.$errors.length }"
        v-model.trim="user.username"
        type="text"
        placeholder="Enter your username"
      />

      <span v-if="v$.user.username.$error" class="form__error_msg"
        >Fill in required fields</span
      >
    </div>
    <div>
      <my-input
        class="form__input"
        :class="{ form__input_error: v$.user.password.$errors.length }"
        v-model.trim="user.password"
        type="password"
        placeholder="Enter your password"
      />

      <span v-if="v$.user.password.$error" class="form__error_msg"
        >Fill in required fields</span
      >
    </div>

    <my-button @click="checkForm" class="form__btn">Login</my-button>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { mapState } from "vuex";

import "./styles.scss";

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
