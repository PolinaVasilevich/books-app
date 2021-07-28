<template>
  <div>
    <h1>Welcome to administrator page</h1>
    <div>
      <button type="button" class="btn btn btn-outline-success">
        <router-link class="link" to="/admin/adminbooks">Books</router-link>
      </button>
      <button type="button" class="btn btn btn-outline-success">
        <router-link class="link" to="/admin/adminauthors">Authors</router-link>
      </button>

      <button type="button" class="btn btn btn-outline-success">
        <router-link class="link" to="/admin/admingenres">Genres</router-link>
      </button>

      <button type="button" class="btn btn btn-outline-success">
        <router-link class="link" to="/admin/adminusers">Users</router-link>
      </button>
    </div>
  </div>
</template>
