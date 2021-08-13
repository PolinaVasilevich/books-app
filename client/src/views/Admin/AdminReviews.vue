<template>
  <div>
    <Toast />
    <admin-table
      title="Reviews"
      :data="reviews"
      @openModal="openModal"
      @openEditModal="editModal"
      @deleteItem="onDeleteData"
      :disabledCreateButton="true"
    >
      <template #content>
        <Column field="username" header="User" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.user.username }}
          </template>
        </Column>

        <Column field="book" header="Book" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.book.title }}
          </template>
        </Column>

        <Column field="text" header="Review"> </Column>

        <Column field="created_date" header="Created date">
          <template #body="slotProps">
            {{ moment(slotProps.data.created_date).format("YYYY-MM-DD HH:mm") }}
          </template>
        </Column>
        <Column
          field="rating"
          header="Rating"
          :sortable="true"
          style="min-width: 12rem"
        >
          <template #body="slotProps">
            <Rating
              :modelValue="slotProps.data.rating"
              :readonly="true"
              :cancel="false"
            />
          </template>
        </Column>
      </template>
      <template #modal>
        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template #modal-content>
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
          <template #modal-content>
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
    </admin-table>
  </div>
</template>

<script>
import moment from "moment";

import AdminTable from "@/components/Admin/AdminTable.vue";
import ModalForm from "@/components/UI/ModalForm";
import AdminReviewForm from "@/components/Admin/Forms/AdminReviewForm.vue";

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
        this.getReviews();
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: `Review for book ${record.book.title} deleted`,
          life: 3000,
        });
      } catch (error) {
        console.log(error);
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: `${error.response.data.message}`,
          life: 3000,
        });
        this.getReviews();
      }
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
