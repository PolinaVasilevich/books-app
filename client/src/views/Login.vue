<template>
  <div class="form">
    <Toast />
    <div v-if="!isAdmin" class="mkdf-has-bg-image" data-height="300">
      <div class="mkdf-title-wrapper" style="height: 300px">
        <div class="mkdf-title-inner" style="height: inherit">
          <div class="mkdf-grid">
            <!-- <h2 class="mkdf-page-title entry-title" style="color: #ffffff">
              {{ currentBook.title }}
            </h2> -->
          </div>
        </div>
      </div>
    </div>

    <my-form
      @submitForm="onLogin"
      :data="data"
      style="text-align: center"
      typeForm="login"
    />
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
/* .form {
  width: 750px;
  margin: 50px auto;
  text-align: center;
} */
</style>
