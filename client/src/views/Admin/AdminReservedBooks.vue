<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
    <admin-table
      titleTable="Reserved books"
      :headers="headers"
      :data="reservedBooks"
    >
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
            <select class="form-control select" v-model="data.user">
              <option v-for="user in users" :key="user._id" :value="user">
                {{ user.username }}
              </option>
            </select>

            <select class="form-control select" v-model="data.book">
              <option v-for="book in books" :key="book._id" :value="book">
                {{ book.title }}
              </option>
            </select>

            <input
              class="form-control select"
              type="datetime-local"
              v-model="data.date_reserved"
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-danger">Reset</button>
            </div>
          </form>
        </my-modal>
        <my-modal :showModal="showEditModal" @close="showEditModal = false">
          <form @submit.prevent="onSubmitUpdate" @reset="onResetUpdate">
            <select class="form-control select" v-model="editForm.user">
              <option v-for="user in users" :key="user._id" :value="user">
                {{ user.username }}
              </option>
            </select>

            <select class="form-control select" v-model="editForm.book">
              <option v-for="book in books" :key="book._id" :value="book">
                {{ book.title }}
              </option>
            </select>

            <input
              class="form-control select"
              type="datetime-local"
              v-model="editForm.date_reserved"
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="reset" class="btn btn-danger">Cancel</button>
            </div>
          </form>
        </my-modal>
      </template>
      <template v-slot:data>
        <tr v-for="book in reservedBooks" :key="book._id">
          <td>{{ book.user.username }}</td>
          <td>{{ book.book.title }}</td>
          <td>
            {{ moment(book.date_reserved).format("YYYY-MM-DD hh:mm") }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editRecord(book)"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="onDeleteRecord(book)"
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
import moment from "moment";

import AdminTable from "@/components/Admin/AdminTable.vue";
import MyAlert from "@/components/UI/MyAlert";

import API from "@/utils/api";
import "@/assets/styles/main.scss";

export default {
  name: "admin-reservedBooks",
  components: { AdminTable, MyAlert },
  data() {
    return {
      moment: moment,
      data: {
        user: null,
        book: null,
        date_reserved: moment(new Date()).format("YYYY-MM-DDThh:mm"),
      },

      editForm: {
        _id: "",
        user: "",
        book: "",
        date_reserved: "",
      },

      headers: ["User", "Book", "Reserved date"],
      showModal: false,
      showMessage: false,
      showEditModal: false,
    };
  },

  methods: {
    resetForm() {
      this.data.user = "";
      this.data.book = "";
      this.data.date_reserved = "";

      this.editForm.user = "";
      this.editForm.book = "";
      this.editForm.date_reserved = "";
    },

    async addNewRecord(payload) {
      try {
        await API.post("books/reservebook", payload);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
        this.message = "Reserve book added!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.showMessage = true;
        this.message = error.response.data.message;
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
      }
    },

    onSubmit() {
      this.showModal = false;

      this.addNewRecord({
        ...this.data,
        date_reserved: new Date(this.data.date_reserved).toISOString(),
      });

      this.resetForm();
    },

    async removeRecord(recordID, payload) {
      try {
        await API.delete(`/books/deletereservedbook/${recordID}`, {
          data: { book: payload },
        });
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
        this.message = "Reserve book removed!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
      }
    },

    onDeleteRecord(record) {
      this.removeRecord(record._id, record.book);
    },

    editRecord(record) {
      const reservedBook = JSON.parse(
        JSON.stringify(this.reservedBooks)
      ).filter((book) => book.book.title === record.book.title);

      this.editForm = {
        ...reservedBook[0],
        user: JSON.parse(JSON.stringify(record)).user,
        book: JSON.parse(JSON.stringify(record)).book,
        date_reserved: moment(record.date_reserved).format("YYYY-MM-DDThh:mm"),
      };

      console.log(record.date_reserved);

      this.showEditModal = true;
    },

    async updateRecord(payload, recordID) {
      try {
        await API.put(`/books/updatereservedbook/${recordID}`, payload);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
        this.message = "Reserve book updated!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
      }
    },

    onSubmitUpdate() {
      this.showEditModal = false;
      this.updateRecord(
        {
          ...this.editForm,
          date_reserved: new Date(this.editForm.date_reserved).toISOString(),
        },
        this.editForm._id
      );
    },

    onResetUpdate() {
      this.resetForm();
      this.getReservedBooks();
      this.getBooks();
      this.getUsers();
      this.showEditModal = false;
    },

    ...mapActions({
      getReservedBooks: "books/getReservedBooks",
      getBooks: "books/getBooks",
      getUsers: "login/getUsers",
    }),
  },

  computed: {
    ...mapState({
      reservedBooks: (state) =>
        state.books.reservedBooks.sort((first, second) => {
          const firstUser = first.user.username.toLowerCase();
          const secondUser = second.user.username.toLowerCase();
          if (firstUser < secondUser) {
            return -1;
          }
          if (firstUser > secondUser) {
            return 1;
          }
          return 0;
        }),
      books: (state) => state.books.books,
      users: (state) => state.login.users,
    }),
  },

  created() {
    this.getReservedBooks();
    this.getBooks();
    this.getUsers();
  },
};
</script>
