<template>
  <div>
    <h1>Welcome to administrator page</h1>
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
              v-model="book.title"
              placeholder="Enter title"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model="book.author"
              placeholder="Enter author"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model="book.genre"
              placeholder="Enter genre"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model="book.img"
              placeholder="Enter url image"
              required
            />
            <input
              class="form-control input"
              type="number"
              v-model="book.count"
              placeholder="Enter count"
              required
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-danger">Reset</button>
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
            <button type="button" class="btn btn-warning btn-sm">Update</button>
            <button type="button" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTable from "@/components/Admin/AdminTable.vue";
import API from "@/utils/api";

export default {
  name: "admin-books",
  components: { AdminTable },
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
      headers: ["Title", "Author", "Genre", "Count"],
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

    resetForm() {
      this.book.title = "";
      this.book.author = "";
      this.book.genre = "";
      this.book.img = "";
      this.book.count = 0;
    },

    onSubmit() {
      this.showModal = false;
      this.addBook({ ...this.book });
      this.resetForm();
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
