<template>
  <div class="book-page">
    <Toast />
    <div>
      <div class="book-page__content">
        <div class="book-page__content__img-container">
          <img
            :src="currentBook.img"
            :alt="currentBook.title"
            class="book-page__content__img"
          />
        </div>
        <div class="book-page__content__info">
          <div style="width: 100%" class="flex-container">
            <Button
              icon="pi pi pi-pencil"
              class="p-button-rounded p-button-success p-button-text"
              style="fontsize: 2rem; padding-top: 0"
              @click="displayEditForm = !displayEditForm"
            />

            <admin-form
              style="width: 100%"
              typeForm="update"
              :showButtons="displayEditForm"
              :dataForm="editForm"
              :path="`/books/updatebook/${editForm._id}`"
              :callback="this.getCurrentBook"
              @resetForm="resetForm"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
              @closeEditForm="closeEditForm"
            >
              <template v-slot:input>
                <div class="flex-container book-info-text-container">
                  <span class="book-page__content__info__author">BY </span>
                  <select
                    class="form-control book-page__content__info__author"
                    v-model="editForm.author"
                    :class="{
                      'disabled-form': !displayEditForm,
                      'input-margin-bottom': displayEditForm,
                    }"
                  >
                    <option
                      v-for="item in authors"
                      :key="item._id"
                      :value="item"
                    >
                      {{
                        (item.first_name + " " + item.last_name).toUpperCase()
                      }}
                    </option>
                  </select>
                </div>

                <Textarea
                  v-model="editForm.title"
                  :autoResize="true"
                  placeholder="Enter title book"
                  class="book-page__content__info__title"
                  :class="{
                    'disabled-form': !displayEditForm,
                    'input-margin-bottom': displayEditForm,
                  }"
                  style="
                    margin-bottom: 10px;
                    padding-left: 0;
                    width: 100%;
                    font-family: 'Cormorant Garamond', sans-serif;
                  "
                />

                <Rating
                  v-model="editForm.rating"
                  :cancel="false"
                  :readonly="true"
                  v-if="currentBook.rating && !displayEditForm"
                  class="book-page__content__info__text"
                  style="margin-top: -30px"
                />

                <div class="woocommerce-product-details__short-description">
                  <Textarea
                    v-model="editForm.description"
                    :autoResize="true"
                    placeholder="Enter description book"
                    :class="[
                      'woocommerce-product-details__short-description',
                      {
                        'disabled-form': !displayEditForm,
                        'input-margin-bottom': displayEditForm,
                      },
                    ]"
                    style="
                      padding: 0;
                      font-family: 'Cormorant Garamond', sans-serif;
                    "
                  />
                </div>

                <p
                  class="
                    flex-container
                    book-info-text-container
                    book-page__content__info__text
                  "
                >
                  Genre:
                  <select
                    class="form-control"
                    v-model="editForm.genre"
                    :class="{
                      'disabled-form': !displayEditForm,
                      'input-margin-bottom': displayEditForm,
                    }"
                  >
                    <option
                      v-for="item in genres"
                      :key="item._id"
                      :value="item"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </p>

                <p
                  class="
                    flex-container
                    book-info-text-container
                    book-page__content__info__text
                  "
                  v-if="displayEditForm"
                >
                  Image:
                  <Textarea
                    v-model="editForm.img"
                    :autoResize="true"
                    placeholder="Enter image book"
                    class="form-control input-margin-bottom"
                  />
                </p>

                <p
                  class="
                    flex-container
                    book-info-text-container
                    book-page__content__info__text
                  "
                >
                  Count:
                  <input
                    v-model="editForm.count"
                    class="form-control book-page__content__info__text"
                    :class="{
                      'disabled-form': !displayEditForm,
                      'input-margin-bottom': displayEditForm,
                    }"
                    type="number"
                    placeholder="Enter count books"
                    min="1"
                    required
                  />
                </p>

                <router-link
                  :to="{
                    name: 'reservedBooks',
                    params: { reservedBookTitle: currentBook.title },
                  }"
                  class="router-link"
                  >Users who reserved this book</router-link
                >
              </template>
            </admin-form>
          </div>
          <div class="reviews">
            <review-list
              :items="reviewsBook"
              :currentUser="user"
              typeForm="update"
              :callback="this.getReviewsBook"
              :bookTitle="currentBook.title"
              @hideReview="hideReview"
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
      currentBook: {},
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

    getCurrentBook() {
      const book = this.books.find(
        (book) => book._id === this.$route.params.id
      );

      if (book) {
        this.currentBook = book;
        this.editForm = book;
      }
    },

    async hideReview(value) {
      try {
        await API.put(`/books/updatereview/${value._id}`, {
          ...value,
          isHidden: !value.isHidden,
        });

        this.getReviewsBook();
        this.showMessage("Item updated");
      } catch (error) {
        console.log(error);
        this.showErrorMessage(error.response.data.message);
      }
    },

    resetForm() {
      this.getBooks();
      this.getCurrentBook();
    },
  },

  created() {
    this.getReviewsBook();
    this.getCurrentBook();
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  },
};
</script>
