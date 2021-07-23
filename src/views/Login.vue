<template>
  <login-form class="form" @login="onLogin" :inputs="inputs" />
</template>

<script>
import LoginForm from "@/components/LoginForm/LoginForm";

export default {
  components: {
    LoginForm,
  },
  methods: {
    onLogin(user) {
      this.$store
        .dispatch("login/login", user)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.form {
  width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
}
</style>
