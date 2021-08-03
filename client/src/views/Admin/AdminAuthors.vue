<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />

    <admin-table titleTable="Authors" :headers="headers" :data="authors">
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
              v-model.trim="author.first_name"
              placeholder="Enter first name"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model.trim="author.last_name"
              placeholder="Enter last name"
              required
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
              v-model.trim="editForm.first_name"
              placeholder="Enter first name"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model.trim="editForm.last_name"
              placeholder="Enter last name"
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
        <tr v-for="author in authors" :key="author._id">
          <td>{{ author.first_name }}</td>
          <td>{{ author.last_name }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editAuthor(author)"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="onDeleteAuthor(author)"
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
import API from "@/utils/api";

import "@/assets/styles/main.scss";

export default {
  name: "admin-authors",
  components: { AdminTable, MyAlert },
  data() {
    return {
      author: {
        first_name: "",
        last_name: "",
      },
      editForm: {
        _id: "",
        first_name: "",
        last_name: "",
      },
      headers: ["First name", "Last Name"],
      message: "",

      showModal: false,
      showMessage: false,
      showEditModal: false,
    };
  },

  methods: {
    ...mapActions({
      getAuthors: "books/getAuthors",
    }),

    resetForm() {
      this.author.first_name = "";
      this.author.last_name = "";

      this.editForm._id = "";
      this.editForm.first_name = "";
      this.editForm.last_name = "";
    },

    async addAuthor(payload) {
      try {
        await API.post("books/author", payload);
        this.getAuthors();
        this.message = "Author added!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getAuthors();
      }
    },

    onSubmit() {
      this.showModal = false;
      this.addAuthor(this.author);
      this.resetForm();
    },

    async removeAuthor(authorID) {
      try {
        await API.delete(`/books/deleteauthor/${authorID}`);
        this.getAuthors();
        this.message = "Author removed!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getAuthors();
      }
    },

    onDeleteAuthor(author) {
      this.removeAuthor(author._id);
    },

    editAuthor(author) {
      this.editForm = author;
      this.showEditModal = true;
    },

    async updateAuthor(payload, authorID) {
      try {
        await API.put(`/books/updateauthor/${authorID}`, payload);
        this.getAuthors();
        this.message = "Book updated!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getAuthors();
      }
    },

    onSubmitUpdate() {
      this.showEditModal = false;
      this.updateAuthor(this.editForm, this.editForm._id);
    },

    onResetUpdate() {
      this.resetForm();
      this.getAuthors();
    },
  },

  computed: {
    ...mapState("books", {
      authors: (state) => state.authors,
    }),
  },

  created() {
    this.getAuthors();
  },
};
</script>
