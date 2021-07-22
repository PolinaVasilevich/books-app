<template>
  <form @submit.prevent class="form">
    <h1>Login</h1>
    <input
      class="form__input"
      :class="{ 'input-error': v$.user.username.$errors.length }"
      v-model.trim="user.username"
      type="text"
      placeholder="Enter your username"
    />

    <div
      class="input-errors"
      v-for="error of v$.user.username.$errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>

    <input
      class="form__input"
      :class="{ 'input-error': v$.user.password.$errors.length }"
      v-model.trim="user.password"
      type="password"
      placeholder="Enter your password"
    />

    <div
      class="input-errors"
      v-for="error of v$.user.password.$errors"
      :key="error.$uid"
    >
      <div class="error-msg">{{ error.$message }}</div>
    </div>

    <my-button @click="submitForm" class="form__btn">Login</my-button>

    <span v-if="$store.state.status"></span>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
    submitForm() {
      this.v$.$touch();

      if (this.v$.$invalid) {
        return;
      }
      const user = this.user;

      this.$store
        .dispatch("login", user)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
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

<style scoped lang="scss">
.form {
  .form__input {
    margin: 10px 0 5px 0;
    padding: 10px;
    width: 100%;
    border: none;
    outline: none;
    border: 1px solid #ddd;
    font-size: 1em;
  }
  .error-msg {
    color: red;
  }
  .input-error {
    border-color: red;
  }

  .btn {
    background-color: #3498db;
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    color: white;
  }
}
</style>
