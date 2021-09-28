<template>
  <div class="book-page">
    <Toast />

    <div v-if="!isAdmin" class="mkdf-has-bg-image" data-height="300">
      <div class="mkdf-title-wrapper" style="height: 300px">
        <div class="mkdf-title-inner" style="height: inherit">
          <div class="mkdf-grid">
            <!-- <h2 class="mkdf-page-title entry-title" style="color: #ffffff">
              {{ currentBook.title }}
            </h2> -->
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="map">
        <map-loader :mapOptions="libraries" />
      </div>

      <div class="book-page__content">
        <div class="book-page__content__img-container">
          <img
            :src="currentBook.img"
            :alt="currentBook.title"
            class="book-page__content__img"
          />
        </div>
        <div class="book-page__content__info">
          <p class="book-page__content__info__author">
            BY
            {{
              currentBook.author?.first_name +
              " " +
              currentBook.author?.last_name
            }}
          </p>
          <h2 class="book-page__content__info__title">
            {{ currentBook.title }}
          </h2>
          <div style="display: flex">
            <Rating
              :modelValue="currentBook.rating"
              :cancel="false"
              :readonly="true"
              v-if="currentBook.rating"
              class="book-page__content__info__text"
              style="margin-top: 10px"
            />
          </div>

          <div class="woocommerce-product-details__short-description">
            <p>
              {{ currentBook.description }}
            </p>
          </div>

          <!-- <div v-if="!currentBook.count">
            <p
              style="
                color: #000;
                font-family: 'Josefin Sans', sans-serif;
                font-size: 12px;
                text-transform: uppercase;
                font-weight: 400;
                margin: 41px 0 0 0;
                display: inline-block;
                background-color: transparent;
                border: 2px solid #efe6d5;
                text-align: center;
                line-height: 2.857em;
                letter-spacing: 0.35em;
                padding: 9px 27px 5px 32px;
              "
            >
              {{ currentBook?.count }} IN STOCK
            </p>
          </div> -->
          <div v-if="libraries.length && !isReserved">
            <Dropdown
              v-model="selectedLibrary"
              :options="libraries"
              optionLabel="name"
              placeholder="Select a library"
              style="width: 70%"
              :disabled="isDisabled"
            />
          </div>

          <Button
            v-if="!libraries.length && !isReserved"
            :label="'out of stock'.toUpperCase()"
            class="p-button-warning"
            @click="onReserveBook(currentBook, user)"
            :disabled="!libraries.length || isReserved"
            icon="pi pi-book"
            style="margin: 50px 0"
          />

          <Button
            v-if="
              isLoggedIn && !user.isAdmin && libraries.length && !isReserved
            "
            :label="'Reserve book'.toUpperCase()"
            class="p-button-warning"
            @click="onReserveBook(currentBook, user)"
            :disabled="
              !libraries.length || isReserved || isDisabled || !selectedLibrary
            "
            icon="pi pi-book"
            style="margin: 30px 0"
          />

          <Button
            v-if="isLoggedIn && !user.isAdmin && isReserved"
            :label="'You reserved this book'.toUpperCase()"
            class="p-button-warning"
            :disabled="!libraries.length || isReserved"
            icon="pi pi-book"
            style="margin: 50px 0"
          />

          <div>
            <p class="book-page__content__info__text">
              Genre:
              <router-link
                style="text-decoration: none"
                :to="{
                  name: 'books',
                  params: { bookGenre: currentBook.genre.name },
                }"
                >{{ currentBook.genre?.name }}</router-link
              >
            </p>
            <!-- <p class="book-page__content__info__text">
              Count:
              {{ currentBook?.count }}
            </p> -->
            <p class="book-page__content__info__text" v-if="selectedLibrary">
              Count:
              {{ selectedLibrary?.book_count }}
            </p>
          </div>
          <div class="reviews">
            <Button
              :label="
                !isUserReview
                  ? 'ADD REVIEW'
                  : 'You have already left a review'.toUpperCase()
              "
              :icon="!isUserReview ? 'pi pi-user-edit' : ''"
              class="p-button-raised p-button-secondary p-button-text"
              @click="openModal"
              v-if="isLoggedIn && user.username !== 'admin'"
              style="margin-bottom: 37px"
              :disabled="isUserReview"
            />
            <review-list
              :items="reviewsBook"
              :currentUser="user"
              typeForm="update"
              :callback="this.getReviewsBook"
              :bookTitle="currentBook?.title"
              @deleteReview="confirmDelete($event)"
            />
            <confirm-dialog
              text="delete this review"
              :displayConfirmDialog="displayConfirmDialog"
              @hideConfirmDialog="displayConfirmDialog = false"
              @action="onDeleteReview"
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
    </div>
  </div>
</template>

<script>
import API from "../utils/api";
import MapLoader from "@/components/MapLoader";
import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

import ReviewList from "@/components/Reviews/ReviewList";
import ConfirmDialog from "@/components/UI/ConfirmDialog";

export default {
  components: { ReviewList, ConfirmDialog, MapLoader },
  mixins: [toggle, adminFormMixin, dataStore],
  data() {
    return {
      libraries: [],
      selectedLibrary: null,
      isReserved: false,
      isDisabled: false,
      isUserReview: false,
      editDataFormID: null,
      displayConfirmDialog: false,
      review: null,
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
        if (this.user._id) {
          await this.$store.dispatch(
            "books/getUserReservedBooks",
            this.user._id
          );
        }
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
              (detail) => detail.isActual && detail.status === "Reserved"
            )
          );
        });

        this.isReserved = !!books.length;
      } catch (error) {
        console.log(error);
      }
    },

    async checkUserReviewBook() {
      try {
        if (this.user._id) {
          const userReviews = await API.get(
            `books/userreviewsbook/${this.$route.params.id}&${this.user._id}`
          );
          this.isUserReview = !!userReviews.data.length;
        }
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
            libraryID: this.selectedLibrary._id,
          });

          this.isDisabled = true;
          this.getBooks();
          this.getReservedBooks();
          this.getLibrariesByBook();
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
        this.isUserReview = true;
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

    confirmDelete(review) {
      this.displayConfirmDialog = true;
      this.review = review;
    },

    async onDeleteReview() {
      this.displayConfirmDialog = false;
      try {
        await API.delete(`/books/deletereview/${this.review}`);
        this.getReviewsBook();
        this.showMessage(`Review with id ${this.review} deleted`);
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
        this.getReviewsBook();
      }
    },

    async getLibrariesByBook() {
      try {
        const data = await API.get(
          `/books/libraries-book/${this.$route.params.id}`
        );
        this.libraries = data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {
    this.getBooks();
    this.getLibrariesByBook();
    this.getCurrentBook();
    this.getReviewsBook();
    this.getReservedBooks();
    this.checkReserveBook(this.currentBook._id, this.user?._id);
    this.checkUserReviewBook();
  },
};
</script>

<style scoped></style>
