<template>
  <div>
    <admin-table
      titleTable="Reserved books"
      :headers="headers"
      :data="reservedBooks"
    >
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
            <admin-reserved-books-form
              typeForm="create"
              v-model:user="data.user"
              v-model:book="data.book"
              v-model:date_reserved="data.date_reserved"
              :dataForm="data"
              :books="books"
              :users="users"
              path="books/reservebook"
              :callback="this.getReservedBooks"
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
            <admin-reserved-books-form
              typeForm="update"
              v-model:user="editForm.user"
              v-model:book="editForm.book"
              v-model:date_reserved="editForm.date_reserved"
              :dataForm="editForm"
              :books="books"
              :users="users"
              :path="`/books/updatereservedbook/${editForm._id}`"
              :callback="this.getReservedBooks"
              @resetForm="resetEditForm"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr v-for="item in reservedBooks" :key="item._id">
          <td>{{ item.user.username }}</td>
          <td>{{ item.book.title }}</td>
          <td>
            {{ moment(item.date_reserved).format("YYYY-MM-DDTHH:mm") }}
          </td>
          <td>
            <admin-buttons
              @showEditForm="editModal(item)"
              @delete="onDeleteData(item)"
            />
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import moment from "moment";

import AdminTable from "@/components/Admin/AdminTable.vue";
import ModalForm from "@/components/UI/ModalForm";
import AdminReservedBooksForm from "@/components/Admin/Forms/AdminReservedBooksForm.vue";
import AdminButtons from "@/components/Admin/AdminButtons";

import API from "@/utils/api";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,
    ModalForm,
    AdminReservedBooksForm,
    AdminButtons,
  },

  data() {
    return {
      moment: moment,
      data: {
        user: "",
        book: "",
        date_reserved: "",
      },

      editForm: {
        _id: "",
        user: "",
        book: "",
        date_reserved: "",
      },

      headers: ["User", "Book", "Reserved Date"],
    };
  },

  methods: {
    async onDeleteData(record) {
      try {
        await API.delete(`/books/deletereservedbook/${record._id}`, {
          data: { book: record.book },
        });
        this.message = "Record has deleted";
        this.openMessage();
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();
      }
    },

    editModal(item) {
      this.editForm = item;
      this.initialEditForm = { ...item };
      this.openEditModal();
    },

    resetForm() {
      this.data.user = this.users[0];
      this.data.book = this.books[0];
      this.data.date_reserved = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    },

    resetEditForm() {
      this.editForm.user = this.initialEditForm.user;
      this.editForm.book = this.initialEditForm.book;
      this.editForm.date_reserved = moment(
        this.initialEditForm.date_reserved
      ).format("YYYY-MM-DDTHH:mm");
    },
  },

  created() {
    this.getReservedBooks();
    this.getBooks();
    this.getUsers();
  },

  mounted() {
    this.data.user = this.users[0];
    this.data.book = this.books[0];
    this.data.date_reserved = moment(new Date()).format("YYYY-MM-DDTHH:mm");
  },
};
</script>
