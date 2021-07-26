<template>
  <form @submit.prevent class="form">
    <h1>Login</h1>
    <div v-for="input in inputs" :key="input.id">
      <my-input
        v-model="user[input.name]"
        class="form__input"
        :class="{
          form__input_error: v$.user[input.name].$error && input.required,
        }"
        :name="input.name"
        :type="input.type"
        :placeholder="input.placeholder"
      />
      <span
        v-if="v$.user[input.name].$error && input.required"
        class="form__error_msg"
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

  props: {
    inputs: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      user: {},
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
