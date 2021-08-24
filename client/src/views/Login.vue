<template>
  <div class="form">
    <Toast />
    <my-form @submitForm="onLogin" :data="data" />
    <p>
      Not registred?
      <router-link
        style="text-decoration: none; color: #f66e5e"
        to="/registration"
        >Create an account!</router-link
      >
    </p>
  </div>
</template>

<script>
import MyForm from "@/components/MyForm/MyForm";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    MyForm,
  },

  methods: {
    async onLogin(user) {
      try {
        await this.$store.dispatch("login/login", user);
        if (user.username === "admin") {
          this.$router.push(`/admin/adminbooks`);
        } else {
          this.$router.push(`/`);
        }
      } catch (error) {
        console.log(error);
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: error.message,
          life: 3000,
        });
      }
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
