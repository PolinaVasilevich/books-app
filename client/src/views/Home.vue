<template>
  <div>
    <div
      :style="{
        backgroundImage: `url(http://subsolardesigns.com/leona/wp-content/uploads/2019/04/hero_image2_clear.jpg)`,
        width: '100%',
        height: '600px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    ></div>
    <all-books-page :bookGenre="bookGenre" />
  </div>
</template>

<script>
import AllBooksPage from "./AllBooksPage.vue";
import dataStore from "@/mixins/dataStore.js";
export default {
  mixins: [dataStore],
  components: { AllBooksPage },
  props: {
    bookGenre: {
      type: String,
    },
  },
  created() {
    this.getBooks();
    this.getUsers();
    this.getAuthors();
  },
};
</script>
