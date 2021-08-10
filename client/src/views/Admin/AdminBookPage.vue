<template>
  <div class="admin-book-page">
    <Message v-if="displayMessage" severity="success">{{ message }}</Message>

    <Message v-if="displayErrorMessage" severity="error">{{ message }}</Message>
    <div class="flex-container">
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
              :cancel="displayEditForm"
              :readonly="!displayEditForm"
            />
          </template>
        </admin-form>
      </div>
    </div>
  </div>
</template>

<script>
import AdminForm from "@/components/Admin/Forms/AdminForm";

import adminFormMixin from "@/mixins/adminFormMixin";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  components: { AdminForm },
  mixins: [adminFormMixin, toggle, dataStore],

  data() {
    return {
      book: null,
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

    resetForm() {
      this.getBooks();
      this.getBook();
    },
  },

  created() {
    this.getBook();
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  },
};
</script>
