<template>
  <div class="book-page">
    <Toast />
    <div class="alerts">
      <Message
        v-if="!currentBook.count && !isReserved"
        severity="warn"
        class="message"
        >Sorry, but now books out of stock</Message
      >

      <Message
        v-if="isReserved && !displayMessage"
        severity="info"
        class="message"
        >You have already reserved this book</Message
      >
    </div>

    <div>
      <div class="book-page__content">
        <div>
          <img
            :src="currentBook.img"
            :alt="currentBook.title"
            class="book-page__content__img"
          />
        </div>
        <div class="book-page__content__info">
          <h2 class="book-page__content__info__title">
            {{ currentBook.title }}
          </h2>
          <p class="book-page__content__info__text">
            <strong>Author: </strong>
            {{
              currentBook.author?.first_name +
              " " +
              currentBook.author?.last_name
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
            class="book-page__content__info__text"
          />

          <Button
            v-if="isLoggedIn && !user.isAdmin"
            :label="!isReserved ? 'Reserve book' : 'Reserved'"
            class="p-button-warning"
            @click="onReserveBook(currentBook, user)"
            :disabled="!currentBook.count || !currentBook.count || isReserved"
            icon="pi pi-book"
          />
        </div>
      </div>
      <div>
        <review-list
          :items="reviewsBook"
          :currentUser="user"
          typeForm="update"
          :callback="this.getReviewsBook"
        />

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
            <Textarea
              v-model="data.text"
              :autoResize="true"
              rows="5"
              required
            />
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
      editDataFormID: null,
      reviewsBook: [],
      currentBook: {},
      data: {
        text: "",
        rating: 0,
      },
    };
  },

  methods: {
    async getReservedBooks() {
      try {
        await this.$store.dispatch("books/getUserReservedBooks", this.user._id);
      } catch (error) {
        console.log(error);
      }
    },

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
        const books = this.userReservedBooks.filter((item) => {
          return (
            item.book._id === bookID &&
            item.user._id === userID &&
            item.details.filter(
              (detail) => detail.isActual && detail.status === " Reserved"
            )
          );
        });

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

          this.isReserved = true;
          this.getBooks();
          this.getReservedBooks();
          this.showMessage("Book reserved");
        } catch (error) {
          console.log(error);
          this.getBooks();
          this.getReservedBooks();
          this.showErrorMessage(error.response.data.message);
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
        this.getBooks();
        this.getReviewsBook();

        this.showMessage("Your review added");
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
        this.getBooks();
        this.getReviewsBook();
      }
    },

    onSave() {
      this.saveReview();
      this.resetForm();
      this.closeModal();
    },

    resetForm() {
      this.data.text = "";
      this.data.rating = 0;
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
