<template>
  <div class="alerts">
    <Message v-if="!currentBook.count && !isReserved" severity="warn"
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
          :src="currentBook.img"
          :alt="currentBook.title"
          class="book-page__content__img"
        />
      </div>
      <div class="book-page__content__info">
        <h2 class="book-page__content__info__title">{{ currentBook.title }}</h2>
        <p class="book-page__content__info__text">
          <strong>Author: </strong>
          {{
            currentBook.author?.first_name + " " + currentBook.author?.last_name
          }}
        </p>
        <p class="book-page__content__info__text">
          <strong>Genre: </strong>
          {{ currentBook.genre?.name }}
        </p>
        <p class="book-page__content__info__text">
          <strong>Count: </strong>
          {{ currentBook?.count }}
        </p>

        <Rating
          :modelValue="currentBook.rating"
          :cancel="false"
          :readonly="true"
          v-if="currentBook.rating"
        />

        <button
          v-if="isLoggedIn && user.username !== 'admin'"
          class="book-page__content__btn btn"
          @click="onReserveBook(currentBook, user)"
          :disabled="!currentBook.count"
          :class="{ disabled: !currentBook.count || isReserved }"
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
      <review-list :items="reviewsBook" />

      <Button
        label="New review"
        icon="pi pi-plus"
        class="p-button-success p-mr-2"
        @click="openModal"
        v-if="isLoggedIn && user.username !== 'admin'"
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
          <Textarea v-model="data.text" :autoResize="true" rows="5" required />
          <div>
            <span>Your rating: </span
            ><Rating v-model="data.rating" :readonly="false" />
          </div>
        </div>

        <template #footer>
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click.prevent="onSave"
          />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script>
import API from "../utils/api";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

import ReviewList from "@/components/Reviews/ReviewList";

export default {
  components: { ReviewList },
  mixins: [toggle, adminFormMixin, dataStore],
  data() {
    return {
      isReserved: false,
      reviewsBook: [],
      currentBook: {},
      data: {
        text: "",
      },
    };
  },

  methods: {
    getCurrentBook() {
      const book = this.books.find(
        (book) => book._id === this.$route.params.id
      );

      if (book) {
        this.currentBook = book;
      }
    },

    async getReviewsBook() {
      try {
        const reviewsBook = await API.get(
          `books/reviewsBook/${this.$route.params.id}`
        );
        this.reviewsBook = reviewsBook.data;
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
      if (this.currentBook.count) {
        try {
          await API.post(`books/reservebook`, {
            user: this.user,
            book: this.currentBook,
          });

          this.showMessage(`Book "${this.currentBook.title}" has reserved`);
          this.isReserved = true;

          this.getBooks();
          this.getReservedBooks();
        } catch (error) {
          console.log(error);
          this.showErrorMessage(error.response.data.message);

          this.getBooks();
          this.getReservedBooks();
        }
      }
    },

    async saveReview() {
      try {
        await API.post("books/review", {
          ...this.data,
          book: this.currentBook,
          user: this.user,
        });

        this.getReviewsBook();

        // this.showMessage(`Your review has added`);
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
        this.getReviewsBook();
      }
    },

    onSave() {
      this.saveReview();
      this.getReviewsBook();
      this.closeModal();
    },
  },

  created() {
    this.getBooks();
    this.getCurrentBook();
    this.getReviewsBook();
    this.getReservedBooks();
    this.checkReserveBook(this.currentBook._id, this.user._id);
  },
};
</script>
