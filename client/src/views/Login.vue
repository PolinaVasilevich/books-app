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
        .then(() => {
          if (user.username === "admin") {
            this.$router.push(`/admin/adminbooks`);
          } else {
            this.$router.push(`/user/${user.username}`);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.form {
  width: 500px;
  margin: 150px auto;
  text-align: center;
}
</style>
