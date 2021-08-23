<template>
  <div class="form">
    <Toast />
    <my-form
      @submitForm="onRegistration"
      typeForm="registration"
      title="Registration"
    />
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
  methods: {
    async onRegistration(user) {
      try {
        await API.post("auth/user", user);
      } catch (error) {
        console.log(error);
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data.message,
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
