<template>
  <div class="form">
    <Toast />
    <Dialog v-model:visible="displayMessage" :style="{ width: '50vw' }">
      <div class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
        <i
          class="pi pi-check-circle"
          :style="{
            fontSize: '5rem',
            color: 'var(--green-500)',
            marginBottom: '10px',
          }"
        ></i>
        <div style="text-align: center">
          <h5>Welcome to the Book App!</h5>
          <span :style="{ lineHeight: 1.5, textIndent: '1rem' }">
            Thank you for joining our website.
          </span>
        </div>
      </div>
      <template #footer>
        <div class="p-d-flex p-jc-center">
          <Button
            class="p-button-raised"
            label="Login to your account"
            @click="loginToAccount"
          />
        </div>
      </template>
    </Dialog>
    <my-form @submitForm="onRegistration" title="Registration" />
  </div>
</template>

<script>
import API from "@/utils/api";
import MyForm from "@/components/MyForm/MyForm";
import toggle from "@/mixins/toggle.js";

export default {
  components: {
    MyForm,
  },
  mixins: [toggle],
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async onRegistration(user) {
      this.user = { ...user };
      try {
        await API.post("auth/user", user);
        this.openMessage();
      } catch (error) {
        console.log(error);
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data.message,
        });
      }
    },

    loginToAccount() {
      this.$router.push({
        name: "login",
        params: { data: JSON.stringify(this.user) },
      });
      this.closeMessage();
    },
  },
};
</script>

<style scoped>
.form {
  width: 750px;
  margin: 150px auto;
  text-align: center;
}
</style>
