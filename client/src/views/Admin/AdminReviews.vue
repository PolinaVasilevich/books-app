<template>
  <div>
    <admin-table titleTable="Reviews" :headers="headers" :data="reviews">
      <template v-slot:modal>
        <Message v-if="displayMessage" severity="success">{{
          message
        }}</Message>

        <Message v-if="displayErrorMessage" severity="error">{{
          message
        }}</Message>

        <Button
          label="Reserve book"
          icon="pi pi-plus"
          class="p-button-success p-mr-2"
          @click="openModal"
        />

        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template v-slot:modal-content>
            <admin-review-form
              typeForm="create"
              v-model:user="data.user"
              v-model:book="data.book"
              v-model:text="data.text"
              v-model:created_date="data.created_date"
              v-model:rating="data.rating"
              :dataForm="data"
              :books="books"
              :users="users"
              path="books/review"
              :callback="this.getReviews"
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
            <admin-review-form
              typeForm="update"
              v-model:user="editForm.user"
              v-model:book="editForm.book"
              v-model:text="editForm.text"
              v-model:created_date="editForm.created_date"
              v-model:rating="editForm.rating"
              :dataForm="editForm"
              :books="books"
              :users="users"
              :path="`/books/updatereview/${editForm._id}`"
              :callback="this.getReviews"
              @resetForm="resetEditForm"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr v-for="item in reviews" :key="item._id">
          <td>{{ item.user.username }}</td>
          <td>{{ item.book.title }}</td>
          <td>{{ item.text }}</td>
          <td>
            <Rating v-model="item.rating" :readonly="true" :cancel="false" />
          </td>
          <td>
            {{ moment(item.created_date).format("YYYY-MM-DD HH:mm") }}
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
import AdminReviewForm from "@/components/Admin/Forms/AdminReviewForm.vue";
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
    AdminReviewForm,
    AdminButtons,
  },

  data() {
    return {
      moment: moment,
      data: {
        user: "",
        book: "",
        created_date: "",
        text: "",
        rating: 0,
      },

      editForm: {
        _id: "",
        user: "",
        book: "",
        created_date: "",
        text: "",
        rating: 0,
      },

      headers: ["User", "Book", "Text", "Rating", "Created date"],
    };
  },

  methods: {
    async onDeleteData(record) {
      try {
        await API.delete(`/books/deletereview/${record._id}`, {
          data: { book: record.book },
        });
        this.message = "Record has deleted";
        this.openMessage();
        this.getReviews();
      } catch (error) {
        console.log(error);
        this.getReviews();
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
      this.data.text = "";
      this.data.created_date = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    },

    resetEditForm() {
      const { user, book, text, created_date } = this.initialEditForm;
      this.editForm.user = user;
      this.editForm.book = book;
      this.editForm.text = text;
      this.editForm.created_date =
        moment(created_date).format("YYYY-MM-DDTHH:mm");
    },
  },

  created() {
    this.getReviews();
    this.getBooks();
    this.getUsers();
  },

  mounted() {
    this.data.user = this.users[0];
    this.data.book = this.books[0];
    this.data.created_date = moment(new Date()).format("YYYY-MM-DDTHH:mm");
  },
};
</script>
