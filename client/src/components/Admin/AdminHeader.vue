<template>
  <div class="admin-header">
    <div>
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

        <my-button type="button">
          <router-link class="router-link" to="/admin/adminreviews"
            >Reviews</router-link
          >
        </my-button>

        <my-button type="button">
          <router-link class="router-link" to="/bookactions"></router-link>
        </my-button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "admin-header",
};
</script>
