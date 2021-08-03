<template>
  <div class="admin-header">
    <div class="admin-header__links">
      <my-button type="button">
        <router-link class="router-link" to="/admin/adminbooks"
          >Books</router-link
        >
      </my-button>
      <my-button type="button">
        <router-link class="router-link" to="/admin/adminauthors"
          >Authors</router-link
        >
      </my-button>

      <my-button type="button">
        <router-link class="router-link" to="/admin/admingenres"
          >Genres</router-link
        >
      </my-button>

      <my-button type="button">
        <router-link class="router-link" to="/admin/adminusers"
          >Users</router-link
        >
      </my-button>

      <my-button type="button">
        <router-link class="router-link" to="/admin/adminreservedbooks"
          >Reserved books</router-link
        >
      </my-button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import "./styles/admin.scss";

export default {
  name: "admin-header",
};
</script>
