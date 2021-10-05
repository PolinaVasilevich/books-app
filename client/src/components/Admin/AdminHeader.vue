<template>
  <div>
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
          <router-link class="router-link" to="/admin/adminreviews"
            >Reviews</router-link
          >
        </my-button>

        <Button
          type="button"
          class="p-button-text reset-p-button"
          style="padding: 0.375rem 0.75rem"
        >
          <router-link class="router-link" to="/admin/adminreservedbooks"
            >Reserved books</router-link
          >
          <Badge
            v-if="!loading && countNewReservedBooks.length"
            :value="countNewReservedBooks.length"
            severity="warning"
          ></Badge>
        </Button>

        <my-button type="button">
          <router-link class="router-link" to="/admin/allbookactions">
            All book actions</router-link
          >
        </my-button>

        <my-button type="button">
          <router-link class="router-link" to="/admin/adminchart">
            Statistics</router-link
          >
        </my-button>

        <my-button type="button">
          <router-link class="router-link" to="/admin/adminlibraries">
            Libraries</router-link
          >
        </my-button>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import useReservedBooks from "@/hooks/ReservedBooks/useReservedBooks";
import { onMounted } from "vue";
export default {
  name: "admin-header",
  setup() {
    const {
      data: countNewReservedBooks,
      loading,
      getCountNewReservedBooks,
    } = useReservedBooks();

    onMounted(() => {
      getCountNewReservedBooks();
    });

    return { countNewReservedBooks, loading };
  },
};
</script>
