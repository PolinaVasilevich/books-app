<template>
  <login-form class="form" />
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    LoginForm,
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
