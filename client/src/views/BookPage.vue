<template>
  <div class="alerts">
    <Message v-if="!book.count && !isReserved" severity="warn"
      >Sorry, but now books out of stock</Message
    >

    <Message v-if="isReserved && !displayMessage" severity="info"
      >You have already reserved this book</Message
    >

    <Message :message="message" v-if="displayMessage" severity="success"
      >You have reserved this book</Message
    >
  </div>

  <div class="book-page">
    <div class="book-page__content">
      <div>
        <img
          :src="book.img"
          :alt="book.title"
          class="book-page__content__img"
        />
      </div>
      <div class="book-page__content__info">
        <h2 class="book-page__content__info__title">{{ book.title }}</h2>
        <p class="book-page__content__info__text">
          <strong>Author: </strong>
          {{ book.author.first_name + " " + book.author.last_name }}
        </p>
        <p class="book-page__content__info__text">
          <strong>Genre: </strong>
          {{ book.genre.name }}
        </p>
        <p class="book-page__content__info__text">
          <strong>Count: </strong>
          {{ book.count }}
        </p>

        <Rating :modelValue="book.rating" :cancel="false" readonly="true" />

        <button
          v-if="isLoggedIn && user.username !== 'admin'"
          class="book-page__content__btn btn"
          @click="onReserveBook(book, user)"
          :disabled="!book.count"
          :class="{ disabled: !book.count || isReserved }"
        >
          <i v-if="!isReserved" class="bi bi-book book-page__content__icon">
            Reserve book</i
          >
          <i v-else class="bi bi-book-fill book-page__content__icon">
            Reserved</i
          >
        </button>
      </div>
    </div>
    <div>
      <!-- <Card style="margin-top: 50px; width: 100%">
        <template #title> Add review </template>
        <template #content>
          <Textarea style="width: 100%" />
        </template>
        <template #footer>
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveProduct"
          />
        </template>
      </Card> -->

      <Button
        label="Add review"
        class="p-button-outlined p-button-success"
        @click="openModal"
      />

      <Dialog
        v-model:visible="displayModal"
        :style="{ width: '450px' }"
        header="Add review"
        :modal="true"
        class="p-fluid"
      >
        <div class="p-field">
          <label for="name">Text</label>
          <Textarea
            v-model="data.text"
            :autoResize="true"
            required="true"
            rows="5"
          />
          <Rating v-model="data.rating" :cancel="false" :readonly="false" />
        </div>

        <template #footer>
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveReview"
          />
        </template>
      </Dialog>

      <!-- <div>
        <p v-for="review in reviews" :key="review._id">
          {{ review.text }}
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
import API from "../utils/api";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  mixins: [toggle, adminFormMixin],
  data() {
    return {
      book: {},
      isReserved: false,
      data: {
        text: "",
        rating: 0,
      },
    };
  },

  methods: {
    getBook() {
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

    checkReserveBook(bookID, userID) {
      try {
        const books = JSON.parse(JSON.stringify(this.reservedBooks)).filter(
          (book) => book.book._id === bookID && book.user._id === userID
        );
        this.isReserved = !!books.length;
      } catch (error) {
        console.log(error);
      }
    },

    async onReserveBook() {
      if (this.book.count) {
        try {
          await API.post(`books/reservebook`, {
            user: this.user,
            book: this.book,
          });

          this.showMessage(`Book "${this.book.title}" has reserved`);
          this.isReserved = true;

          this.getBooks();
          this.getBook();
          this.getReservedBooks();
        } catch (error) {
          console.log(error);
          this.showErrorMessage(error.response.data.message);

          this.getBooks();
          this.getBook();
          this.getReservedBooks();
        }
      }
    },

    saveReview() {
      if (this.reviews.length) {
        const rating = Math.round(
          (this.book.rating + this.data.rating) / this.reviews.length
        );
        this.data = { ...this.data, rating };
      }
      this.createRecord("books/review", {
        ...this.data,
        book: this.book,
        user: this.user,
      });
      this.closeModal();
    },
  },

  created() {
    this.getReviews();
    this.getBooks();
    this.getBook();
    this.getReservedBooks();
    this.checkReserveBook(this.book._id, this.user._id);
  },
};
</script>
