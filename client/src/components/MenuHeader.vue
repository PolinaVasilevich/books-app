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
      :model="isAdmin ? headersAdmin : isLogin ? headersAuth : headersNotAuth"
      ref="menu"
      :popup="true"
    >
      <template #item="{ item }">
        <Button
          type="button"
          :label="item.label"
          :icon="item.icon"
          @click="item.command"
          class="p-button-text p-button-text header__text header__text-button"
          :badge="item?.isBadge ? notReturnedBooks?.length : ''"
          badgeClass="p-badge-danger"
        />
      </template>
    </Menu>
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
            this.hide();
            this.$router.push("/");
          },
        },

        {
          label: "Login",
          icon: "pi pi-user",

          command: () => {
            this.hide();
            this.$router.push("/login");
          },
        },
        {
          label: "Register",
          icon: "pi pi-power-off",

          command: () => {
            this.hide();
            this.$router.push("/registration");
          },
        },
      ],

      headersAuth: [
        {
          label: `${this.currentUser?.username}  `,
          icon: "pi pi-user",
          isBadge: true,
          command: () => {
            this.hide();
            this.$router.push({
              name: "userPage",
              params: {
                id: this.currentUser._id,
                notReturned: !!this.notReturnedBooks?.length,
              },
            });
          },
        },
        {
          label: "Home",
          icon: "pi pi-home",
          command: () => {
            this.hide();
            this.$router.push("/");
          },
        },

        {
          label: "My books",
          icon: "pi pi-book",
          command: () => {
            this.hide();
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
            this.hide();
            this.$emit("logout");
          },
        },
      ],
      headersAdmin: [
        {
          label: this.currentUser?.username,
          icon: "pi pi-user",
          command: () => {
            this.hide();
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
            this.hide();
            this.$router.push("/");
          },
        },

        {
          label: "Admin",
          icon: "pi pi-cog",
          command: () => {
            this.hide();
            this.$router.push("/admin/adminbooks");
          },
        },

        {
          label: "Logout",
          icon: "pi pi-power-off",
          command: () => {
            this.hide();
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

    hide() {
      this.$refs.menu.hide();
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

<style scoped>
.p-menuitem:hover {
  background-color: #f3f3f3 !important;
  border-color: #f3f3f3 !important;
}
</style>
>
