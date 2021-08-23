<template>
  <div class="form-demo">
    <div class="p-d-flex p-jc-center" style="display: block !important">
      <div class="card">
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
              <my-input
                v-if="typeForm === 'login'"
                class="p-inputtext p-component p-password-input"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                placeholder="Password*"
                v-model="v$.password.$model"
                type="password"
              />
              <Password
                v-if="typeForm === 'registration'"
                id="password"
                placeholder="Password*"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask
              >
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <Divider />
                  <p class="p-mt-2">Suggestions</p>
                  <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </Password>
            </div>
            <small
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>

          <Button type="submit" label="Submit" class="p-mt-2" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "my-form",
  props: {
    title: {
      type: String,
      default: "Login",
    },
    typeForm: {
      type: String,
      default: "login",
    },
  },
  data() {
    return {
      submitted: false,
    };
  },
  setup() {
    const user = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: { required },
      password: { required },
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
