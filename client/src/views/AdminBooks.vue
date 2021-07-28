<template>
  <div>
    <h1>Welcome to administrator page</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <h1>Books</h1>
          <hr />
          <br /><br />
          <button
            type="button"
            class="btn btn-success btn-sm"
            @click="showModal = true"
          >
            Add Book
          </button>
          <my-modal :showModal="showModal" @close="showModal = false">
            <div @click.stop class="modal__content">
              <h2>Add new book</h2>
              <form @submit.prevent="onSubmit" @reset="onReset">
                <input
                  class="form-control input"
                  type="text"
                  v-model="book.title"
                  placeholder="Enter title"
                />
                <input
                  class="form-control input"
                  type="text"
                  v-model="book.author"
                  placeholder="Enter author"
                />
                <input
                  class="form-control input"
                  type="text"
                  v-model="book.genre"
                  placeholder="Enter genre"
                />
                <input
                  class="form-control input"
                  type="text"
                  v-model="book.img"
                  placeholder="Enter url image"
                />
                <input
                  class="form-control input"
                  type="number"
                  v-model="book.count"
                  placeholder="Enter count"
                />
                <div class="btns">
                  <button type="submit" class="btn btn-primary">Submit</button>
                  <button type="reset" class="btn btn-danger">Reset</button>
                </div>
              </form>
            </div>
          </my-modal>

          <br /><br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Genre</th>
                <th scope="col">Count</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in books" :key="book._id">
                <td>{{ book.title }}</td>
                <td>
                  {{ book.author.first_name + " " + book.author.last_name }}
                </td>
                <td>{{ book.genre[0].name }}</td>
                <td>{{ book.count }}</td>
                <td>
                  <button type="button" class="btn btn-warning btn-sm">
                    Update
                  </button>
                  <button type="button" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import API from "../utils/api";

export default {
  name: "admin-books",

  data() {
    return {
      showModal: false,
      book: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: "0",
      },
    };
  },
  methods: {
    ...mapActions({
      getBooks: "books/getBooks",
    }),

    async addBook(payload) {
      try {
        await API.post("books/book", payload);
        this.getBooks();
      } catch (error) {
        console.log(error);
        this.getBooks();
      }
    },

    initForm() {
      this.book.title = "";
      this.book.author = "";
      this.book.genre = "";
      this.book.img = "";
      this.book.count = 0;
    },

    onSubmit() {
      // this.$refs.book.hide();

      const payload = {
        title: this.book.title,
        author: this.book.author,
        genre: this.book.genre,
        img: this.book.img,
        count: this.book.count,
      };

      this.addBook(payload);
      this.initForm();
    },

    onReset() {
      // this.$refs.book.hide();
      this.initForm();
    },
  },

  computed: {
    ...mapState("books", {
      books: (state) => state.books,
    }),
  },

  created() {
    this.getBooks();
  },
};
</script>
