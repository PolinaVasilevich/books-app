<template>
  <div>
    <admin-table titleTable="Books" :headers="headers" :data="books">
      <template v-slot:modal>
        <Message v-if="displayMessage" severity="success">{{
          message
        }}</Message>

        <Message v-if="displayErrorMessage" severity="error">{{
          message
        }}</Message>

        <Button
          label="Create new record"
          class="p-button-outlined"
          @click="openModal"
        />

        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template v-slot:modal-content>
            <admin-books-form
              typeForm="create"
              v-model:title="data.title"
              v-model:author="data.author"
              v-model:genre="data.genre"
              v-model:img="data.img"
              v-model:count="data.count"
              v-model:authors="authors"
              v-model:genres="genres"
              :dataForm="data"
              path="books/book"
              :callback="this.getBooks"
              @resetForm="resetForm"
              @closeModal="closeModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>

        <modal-form
          modal-title="Update record"
          :displayModal="displayEditModal"
          @close="closeEditModal"
        >
          <template v-slot:modal-content>
            <admin-books-form
              typeForm="update"
              v-model:title="editForm.title"
              v-model:author="editForm.author"
              v-model:genre="editForm.genre"
              v-model:img="editForm.img"
              v-model:count="editForm.count"
              v-model:authors="authors"
              v-model:genres="genres"
              :dataForm="editForm"
              :path="`/books/updatebook/${editForm._id}`"
              :callback="this.getBooks"
              @resetForm="resetEditForm"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr
          v-for="book in books"
          :key="book._id"
          @click="goToPage(book._id)"
          :style="{ cursor: 'pointer' }"
        >
          <td>{{ book.title }}</td>
          <td>{{ book.author.first_name + " " + book.author.last_name }}</td>
          <td>{{ book.genre.name }}</td>
          <td @click.stop="goToPage">{{ book.count }}</td>
          <td>
            <admin-buttons
              @showEditForm="editModal(book)"
              @delete="onDeleteData(book)"
            />
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";

import ModalForm from "@/components/UI/ModalForm";
import AdminBooksForm from "@/components/Admin/Forms/AdminBooksForm";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-authors",
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,

    ModalForm,
    AdminBooksForm,
    AdminButtons,
  },

  data() {
    return {
      initialForm: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },

      data: {
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },

      editForm: {
        _id: "",
        title: "",
        author: "",
        genre: "",
        img: "",
        count: 0,
      },

      headers: ["Title", "Author", "Genre", "Count"],
    };
  },

  methods: {
    onDeleteData(data) {
      this.removeData(`/books/deletebook/${data._id}`, this.getBooks);
      this.message = "Record has deleted";
      this.openMessage();
    },

    editModal(item) {
      this.editForm = item;
      this.initialEditForm = { ...item };
      this.openEditModal();
    },

    goToPage(bookID) {
      this.$router.push({ path: `/adminbook/${bookID}` });
    },

    resetForm() {
      this.data.title = "";
      this.data.author = [];
      this.data.genre = [];
      this.data.img = "";
      this.data.count = 0;
    },

    resetEditForm() {
      this.editForm.title = this.initialEditForm.title;
      this.editForm.author = this.initialEditForm.author;
      this.editForm.genre = this.initialEditForm.genre;
      this.editForm.img = this.initialEditForm.img;
      this.editForm.count = this.initialEditForm.count;
    },
  },

  created() {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  },

  mounted() {
    this.data.author = this.authors[0];
    this.data.genre = this.genres[0];
  },
};
</script>
