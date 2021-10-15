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
    <Dialog v-model:visible="displayMessage" :style="{ width: '500px' }">
      <div
        class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3"
        style="padding-top: 0 !important"
      >
        <img
          src="https://media.istockphoto.com/vectors/like-reading-everywhere-vector-id628136102?k=6&m=628136102&s=170667a&w=0&h=E_yMs6EawXGH4jcAvhvc6KA7x2nklNn7BvhlvTA4ElQ="
          alt="welcome"
        />
        <div style="text-align: center">
          <h3 style="font-weight: bold">Welcome!</h3>
          <span
            :style="{
              lineHeight: 1.5,
              textIndent: '1rem',
              fontSize: '1.2rem',
            }"
          >
            You have successfully registration on <b>Book App</b>
          </span>
          <small></small>
        </div>
      </div>
      <template #footer>
        <div class="p-d-flex p-jc-center">
          <Button
            class="p-button-raised p-button-text p-button-plain"
            label="Login to your account"
            icon="pi pi-user"
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
          life: 3000,
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
