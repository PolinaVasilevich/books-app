<template>
  <div>
    <Button
      icon="pi pi-bars"
      class="p-button-success p-button-text p-button-lg"
      type="button"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    />

    <Menu
      id="overlay_menu"
      ref="menu"
      :model="isAdmin ? headersAdmin : isLogin ? headersAuth : headersNotAuth"
      :popup="true"
    />
  </div>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    notReturnedBooks: {
      type: Array,
    },
  },
  data() {
    return {
      headersNotAuth: [
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/");
          },
        },

        {
          label: "Login",
          icon: "pi pi-user",
          command: () => {
            this.$router.push("/login");
          },
        },
        {
          label: "Register",
          icon: "pi pi-power-off",
          command: () => {
            this.$router.push("/registration");
          },
        },
      ],

      headersAuth: [
        {
          label: `${this.currentUser?.username} ${
            this.notReturnedBooks?.length ? this.notReturnedBooks?.length : ""
          } `,
          icon: "pi pi-user",
          command: () => {
            this.$router.push({
              name: "userPage",
              params: { id: this.currentUser._id },
            });
          },
        },
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/");
          },
        },

        {
          label: "My books",
          icon: "pi pi-book",
          command: () => {
            this.$router.push({
              name: "userPage",
              params: { id: this.currentUser._id },
            });
          },
        },

        {
          label: "Logout",
          icon: "pi pi-power-off",
          command: () => {
            this.$emit("logout");
          },
        },
      ],
      headersAdmin: [
        {
          label: this.currentUser?.username,
          icon: "pi pi-user",
          command: () => {
            this.$router.push({
              name: "userChartPage",
              params: { id: this.currentUser._id },
            });
          },
        },
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            this.$router.push("/");
          },
        },

        {
          label: "Admin",
          icon: "pi pi-cog",
          command: () => {
            this.$router.push("/admin/adminbooks");
          },
        },

        {
          label: "Logout",
          icon: "pi pi-power-off",
          command: () => {
            this.$emit("logout");
          },
        },
      ],

      headers: [],
    };
  },

  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },

  mounted() {
    this.headers = this.isAdmin
      ? this.headersAdmin
      : this.isLogin
      ? this.headersAuth
      : this.headersNotAuth;
  },
};
</script>

<style></style>
