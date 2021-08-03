<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />

    <admin-table titleTable="Books" :headers="headers" :data="books">
      <template v-slot:modal>
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="showModal = true"
        >
          Create new record
        </button>
        <my-modal :showModal="showModal" @close="showModal = false">
          <form @submit.prevent="onSubmit" @reset="resetForm">
            <input
              class="form-control input"
              type="text"
              v-model.trim="book.title"
              placeholder="Enter title"
              required
            />

            <my-select
              :options="
                authors.map((author) => ({
                  name: author.first_name + ' ' + author.last_name,
                }))
              "
              class="select"
              v-model="book.author"
            />

            <my-select :options="genres" class="select" v-model="book.genre" />

            <input
              class="form-control input"
              type="text"
              v-model.trim="book.img"
              placeholder="Enter url image"
              required
            />
            <!-- <file-input class="select" /> -->

            <input
              class="form-control input"
              type="number"
              v-model.trim="book.count"
              placeholder="Enter count"
              required
              min="1"
              max="100"
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-danger">Reset</button>
            </div>
          </form>
        </my-modal>
        <my-modal :showModal="showEditModal" @close="showEditModal = false">
          <form @submit.prevent="onSubmitUpdate" @reset="onResetUpdate">
            <input
              class="form-control input"
              type="text"
              v-model.trim="editForm.title"
              placeholder="Enter title"
              required
            />

            <my-select
              :options="
                authors.map((author) => ({
                  name: author.first_name + ' ' + author.last_name,
                }))
              "
              class="select"
              v-model="editForm.author"
            />

            <my-select
              :options="genres"
              class="select"
              v-model="editForm.genre"
            />
            <input
              class="form-control input"
              type="text"
              v-model.trim="editForm.img"
              placeholder="Enter url image"
              required
            />
            <input
              class="form-control input"
              type="number"
              v-model.trim="editForm.count"
              placeholder="Enter count"
              min="1"
              max="100"
              required
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="reset" class="btn btn-danger">Cancel</button>
            </div>
          </form>
        </my-modal>
      </template>
      <template v-slot:data>
        <tr v-for="book in books" :key="book._id">
          <td>{{ book.title }}</td>
          <td>
            {{ book.author.first_name + " " + book.author.last_name }}
          </td>
          <td>{{ book.genre[0].name }}</td>
          <td>{{ book.count }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editBook(book)"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="onDeleteBook(book)"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTable from "@/components/Admin/AdminTable.vue";

import MyAlert from "@/components/UI/MyAlert";
import MySelect from "@/components/UI/MySelect";

import API from "@/utils/api";
import "@/assets/styles/main.scss";

export default {
  name: "admin-books",
  components: { AdminTable, MyAlert, MySelect },
  data() {
    return {
      book: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: "",
      },

      editForm: {
        _id: "",
        title: "",
        author: "",
        genre: "",
        img: "",
        count: "",
      },

      headers: ["Title", "Author", "Genre", "Count"],
      showModal: false,
      showMessage: false,
      showEditModal: false,
    };
  },

  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
      getAuthors: "books/getAuthors",
      getGenres: "books/getGenres",
    }),

    resetForm() {
      this.book.title = "";
      this.book.author = "";
      this.book.genre = "";
      this.book.img = "";
      this.book.count = 0;

      this.editForm.title = "";
      this.editForm.author = "";
      this.editForm.genre = "";
      this.editForm.img = "";
      this.editForm.count = 0;
    },

    async addBook(payload) {
      try {
        await API.post("books/book", payload);
        this.getBooks();
        this.message = "Book added!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getBooks();
      }
    },

    onSubmit() {
      this.showModal = false;
      this.addBook(this.book);
      this.resetForm();
    },

    async removeBook(bookID) {
      try {
        await API.delete(`/books/deletebook/${bookID}`);
        this.getBooks();
        this.message = "Book removed!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getBooks();
      }
    },

    onDeleteBook(book) {
      this.removeBook(book._id);
    },

    editBook(book) {
      this.editForm = {
        ...book,
        genre: book.genre[0].name,
        author: book.author.first_name + " " + book.author.last_name,
      };
      this.showEditModal = true;
    },

    async updateBook(payload, bookID) {
      try {
        await API.put(`/books/updatebook/${bookID}`, payload);
        this.getBooks();
        this.message = "Book updated!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getBooks();
      }
    },

    onSubmitUpdate() {
      this.showEditModal = false;
      this.updateBook(this.editForm, this.editForm._id);
    },

    onResetUpdate() {
      this.resetForm();
      this.getBooks();
    },
  },

  computed: {
    ...mapState("books", {
      books: (state) => state.books,
      authors: (state) => state.authors,
      genres: (state) => state.genres,
    }),
  },

  created() {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  },
};
</script>
