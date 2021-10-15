<template>
  <div
    class="form-demo"
    style="text-align: center; padding: 100px 0; width: 40vw; margin: 0 auto"
  >
    <div class="p-d-flex p-jc-center" style="display: block !important">
      <div>
        <h3 class="p-text-center">{{ title }}</h3>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
          <div class="p-field">
            <div class="p-float-label">
              <InputText
                id="name"
                placeholder="Username*"
                v-model="v$.username.$model"
                :class="{ 'p-invalid': v$.username.$invalid && submitted }"
              />
            </div>
            <small
              v-if="
                (v$.username.$invalid && submitted) ||
                v$.username.$pending.$response
              "
              class="p-error"
              >{{
                v$.username.required.$message.replace("Value", "Username")
              }}</small
            >
          </div>

          <div class="p-field">
            <div class="p-float-label">
              <Password
                id="password"
                placeholder="Password*"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask
                :feedback="false"
                autocomplete="on"
              >
              </Password>
            </div>
            <div
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
            >
              <small class="p-error" v-if="v$.password.required.$invalid"
                >Password is required</small
              >
              <small class="p-error" v-if="v$.password.minLength.$invalid"
                >Password must be at least 8 characters</small
              >
            </div>
          </div>

          <button type="submit" class="form-button-submit">Submit</button>
          <p v-if="typeForm === 'login'" style="margin-top: 10px">
            Not registred?
            <router-link
              style="text-decoration: none; color: #d14031"
              to="/registration"
              >Create an account!</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  name: "my-form",
  props: {
    title: {
      type: String,
      default: "Login",
    },
    data: {
      type: String,
    },

    typeForm: {
      type: String,
    },
  },

  data() {
    return {
      submitted: false,
    };
  },

  setup(props) {
    onMounted(() => {
      if (props.data) {
        const { username, password } = JSON.parse(props.data);

        user.username = username;
        user.password = password;
      }
    });

    const user = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: { required },
      password: { required, minLength: minLength(3) },
    };

    const v$ = useVuelidate(rules, user);

    return { user, v$ };
  },

  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (isFormValid) {
        this.$emit("submitForm", this.user);
      }
    },
  },
};
</script>

<style>
.form-button-submit {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: auto;
  margin: 0;
  font-family: "Josefin Sans", sans-serif;
  line-height: 2.857em;
  letter-spacing: 0.35em;
  font-weight: 400;
  text-transform: uppercase;
  outline: 0;
  padding: 9px 27px 5px 32px;
  font-size: 12px;
  color: #fff;
  background-color: #d14031;
  border: 1px solid transparent;
  cursor: pointer;
  z-index: 3;
}

.form-button-submit:hover {
  color: #fff;
  background-color: #ad362a;
}
</style>
