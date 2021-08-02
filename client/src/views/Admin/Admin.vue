<template>
  <div class="admin-page">
    <h1 class="admin-page__title">Welcome to administrator page</h1>
    <div>
      <button type="button" class="btn btn btn-outline-success">
        <router-link class="router-link" to="/admin/adminbooks"
          >Books</router-link
        >
      </button>
      <button type="button" class="btn btn btn-outline-success">
        <router-link class="router-link" to="/admin/adminauthors"
          >Authors</router-link
        >
      </button>

      <button type="button" class="btn btn btn-outline-success">
        <router-link class="router-link" to="/admin/admingenres"
          >Genres</router-link
        >
      </button>

      <button type="button" class="btn btn btn-outline-success">
        <router-link class="router-link" to="/admin/adminusers"
          >Users</router-link
        >
      </button>

      <button type="button" class="btn btn btn-outline-success">
        <router-link class="router-link" to="/admin/adminreservedbooks"
          >Reserved books</router-link
        >
      </button>
    </div>
  </div>
</template>

<script>
import "./styles/admin.scss";

export default {};
</script>
