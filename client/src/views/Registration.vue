<template>
  <div class="form">
    <my-form @submitForm="onRegistration" typeForm="registration" />
  </div>
</template>

<script>
import MyForm from "@/components/MyForm/MyForm";
import toggle from "@/mixins/toggle.js";

export default {
  components: {
    MyForm,
  },
  mixins: [toggle],
  methods: {
    async onRegistration(user) {
      try {
        await this.$store.dispatch("login/registration", user);
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
