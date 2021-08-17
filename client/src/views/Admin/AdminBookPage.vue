<template>
  <div class="book-page">
    <Message v-if="displayMessage" severity="success">{{ message }}</Message>

    <Message v-if="displayErrorMessage" severity="error">{{ message }}</Message>
    <div class="flex-container" style="margin-top: 70px">
      <div>
        <img
          :src="book.img"
          :alt="book.title"
          class="book-page__content__img"
        />
      </div>
      <div style="width: 100%" class="flex-container">
        <Button
          icon="pi pi pi-pencil"
          class="p-button-rounded p-button-success p-button-text"
          style="fontsize: 2rem"
          @click="displayEditForm = !displayEditForm"
        />

        <admin-form
          style="width: 100%"
          typeForm="update"
          :showButtons="displayEditForm"
          :dataForm="editForm"
          :path="`/books/updatebook/${editForm._id}`"
          :callback="this.getBooks"
          @resetForm="resetForm"
          @showMessage="showMessage"
          @showErrorMessage="showErrorMessage"
          @closeEditForm="closeEditForm"
        >
          <template v-slot:input>
            <Textarea
              v-model="editForm.title"
              :autoResize="true"
              placeholder="Enter title book"
              class="book-info-title"
              :class="{ 'disabled-form': !displayEditForm }"
            />

            <p class="flex-container book-info-text-container">
              <strong class="book-info-text">Author: </strong>
              <select
                class="form-control book-info-text input-margin"
                v-model="editForm.author"
                :class="{ 'disabled-form': !displayEditForm }"
              >
                <option v-for="item in authors" :key="item._id" :value="item">
                  {{ item.first_name + " " + item.last_name }}
                </option>
              </select>
            </p>

            <p class="flex-container book-info-text-container">
              <strong class="book-info-text">Genre: </strong>

              <select
                class="form-control book-info-text input-margin"
                v-model="editForm.genre"
                :class="{ 'disabled-form': !displayEditForm }"
              >
                <option v-for="item in genres" :key="item._id" :value="item">
                  {{ item.name }}
                </option>
              </select>
            </p>

            <p
              class="flex-container book-info-text-container"
              v-if="displayEditForm"
            >
              <strong class="book-info-text">Image: </strong>
              <Textarea
                v-model="editForm.img"
                :autoResize="true"
                placeholder="Enter image book"
                class="form-control book-info-text input-margin"
              />
            </p>

            <p class="flex-container book-info-text-container">
              <strong class="book-info-text">Count: </strong>
              <input
                v-model="editForm.count"
                class="form-control book-info-text input-margin"
                :class="{ 'disabled-form': !displayEditForm }"
                type="number"
                placeholder="Enter count books"
                min="1"
                required
              />
            </p>
            <Rating
              v-model="editForm.rating"
              :cancel="false"
              :readonly="true"
            />
            <router-link
              :to="{
                name: 'reservedBooks',
                params: { reservedBookTitle: book.title },
              }"
              class="header__link"
              >Users who reserved this book</router-link
            >
          </template>
        </admin-form>
      </div>
    </div>

    <div>
      <review-list
        :items="reviewsBook"
        :currentUser="user"
        @hideReview="hideReview"
      />
    </div>
  </div>
</template>

<script>
import API from "@/utils/api";

import AdminForm from "@/components/Admin/Forms/AdminForm";
import ReviewList from "@/components/Reviews/ReviewList";
import adminFormMixin from "@/mixins/adminFormMixin";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  components: { AdminForm, ReviewList },
  mixins: [adminFormMixin, toggle, dataStore],

  data() {
    return {
      book: null,
      reviewsBook: [],
      editForm: {
        _id: "",
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
        rating: 0,
      },
    };
  },

  methods: {
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
    getBook() {
      try {
        const book = this.books.find(
          (book) => book._id === this.$route.params.id
        );

        if (book) {
          this.book = book;
          this.editForm = book;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async hideReview(value) {
      try {
        await API.put(`/books/updatereview/${value._id}`, {
          ...value,
          isHidden: !value.isHidden,
        });

        this.getReviewsBook();

        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Item Updated",
          life: 3000,
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: `${error.response.data.message}`,
          life: 3000,
        });

        console.log(error);
      }
    },

    resetForm() {
      this.getBooks();
      this.getBook();
    },
  },

  created() {
    this.getReviewsBook();
    this.getBook();
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  },
};
</script>
