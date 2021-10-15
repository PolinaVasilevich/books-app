<template>
  <div class="form">
    <Toast />
    <div class="mkdf-has-bg-image" data-height="300">
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
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    MyForm,
  },

  computed: {
    ...mapGetters({
      errors: "login/errors",
      status: "login/status",
    }),
  },

  methods: {
    ...mapActions({
      login: "login/login",
    }),

    async onLogin(user) {
      await this.login(user);

      if (this.status !== "error") {
        if (user.username === "admin") {
          this.$router.push(`/admin/adminbooks`);
        } else {
          this.$router.push(`/`);
        }
      } else {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: this.errors,
          life: 3000,
        });
      }
    },
  },
};
</script>
