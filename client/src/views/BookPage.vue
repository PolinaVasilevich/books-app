<template>
  <my-alert class="alert alert-danger" :message="message" v-if="showMessage" />
  <div class="container">
    <div class="book">
      <div>
        <img :src="book.img" :alt="book.title" class="book_img" />
        <my-button
          v-if="isLoggedIn"
          class="book__btn"
          @click="onReserveBook(book, user)"
          :disabled="!book.count"
          :class="{ disabled: !book.count }"
          >Reserve book</my-button
        >
      </div>
      <div class="book__info info">
        <h2 class="info__title">{{ book.title }}</h2>
        <p class="info__text">
          Author: {{ book.author.first_name + " " + book.author.last_name }}
        </p>
        <p class="info__text">Count books: {{ book.count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import MyAlert from "@/components/UI/MyAlert";
import API from "../utils/api";

export default {
  components: {
    MyAlert,
  },
  data() {
    return {
      book: {},
      message: "",
      showMessage: false,
    };
  },

  computed: {
    ...mapState({
      books: (state) => state.books.books,
      username: (state) => state.login.user.username,
    }),

    ...mapGetters("login", {
      isLoggedIn: "isLoggedIn",
      isAdmin: "isAdmin",
    }),
  },

  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
    }),

    async getBook() {
      try {
        const book = this.books.find(
          (book) => book._id === this.$route.params.id
        );

        if (book) {
          this.book = book;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async onReserveBook() {
      if (this.book.count) {
        try {
          const payload = {
            ...this.book,
            count: this.book.count - 1,
            genre: this.book.genre[0].name,
            author:
              this.book.author.first_name + " " + this.book.author.last_name,
          };

          await API.put(`books/updatebook/${this.book._id}`, payload);

          await API.post(`books/reservebook`, {
            username: this.username,
            bookId: this.book._id,
          });

          this.getBook();

          // this.message = `Book "${this.book.title}" has reserved`;
          // this.showMessage = true;
          this.$router.push("/");
        } catch (error) {
          console.log(error);
          this.message = error.response.data.message;
          this.showMessage = true;
        }
      }
    },
  },

  created() {
    this.getBook();
  },
};
</script>

<style>
.container {
  margin: 30px auto;
  width: 100%;
}

.book {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.book_img {
  margin-right: 30px;
  display: block;
  object-fit: cover;
  width: 300px;
  height: 400px;
}

.book__btn {
  cursor: pointer;
  margin-top: 30px;
  border: 1px solid #000 !important;
}

.info__text {
  margin-top: 7px;
}

.disabled {
  opacity: 0.25;
  cursor: initial;
}
</style>
