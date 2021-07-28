<template>
  <div>
    <h1>Welcome to administrator page</h1>
    <admin-table titleTable="Books">
      <template v-slot:modal>
        <my-modal :showModal="showModal" @close="showModal = false">
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
        </my-modal>
      </template>
    </admin-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTable from "../components/Admin/AdminTable.vue";
import API from "../utils/api";

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
