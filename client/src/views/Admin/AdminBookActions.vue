<template>
  <div>
    <Toast />
    <admin-table
      titleTable="Books history"
      v-model:searchQuery="searchQuery"
      :data="bookActions"
      @openModal="openModal"
      @openEditModal="editModal"
      @deleteItem="onDeleteData"
    >
      <template #content>
        <Column field="userAction" header="User action" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data?.userAction?.username }}
          </template>
        </Column>

        <Column field="user" header="User" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.user.username }}
          </template>
        </Column>

        <Column field="book" header="Book" :sortable="true">
          <template #body="slotProps">
            {{ slotProps.data.book?.title }}
          </template>
        </Column>

        <Column field="status" header="Status" :sortable="true"> </Column>

        <Column field="action_date" header="Action date" :sortable="true">
          <template #body="slotProps">
            {{
              slotProps.data.action_date
                ? moment(slotProps.data.action_date).format("YYYY-MM-DD HH:mm")
                : ""
            }}
          </template>
        </Column>
      </template>

      <template #modal>
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
              v-model:return_date="editForm.return_date"
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
    </admin-table>
  </div>
</template>

<script>
import moment from "moment";
import API from "@/utils/api";
import AdminTable from "@/components/Admin/AdminTable.vue";
import ModalForm from "@/components/UI/ModalForm";
import AdminReservedBooksForm from "@/components/Admin/Forms/AdminReservedBooksForm.vue";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  props: ["reservedBookTitle"],
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,
    ModalForm,
    AdminReservedBooksForm,
  },

  data() {
    return {
      moment,
      data: {
        user: "",
        book: "",
        date_reserved: "",
      },

      editForm: {
        _id: "",
        user: "",
        book: "",
        return_date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      },
    };
  },

  methods: {
    async onDeleteData(value) {
      try {
        await API.delete(`/books/deletereservedbook/${value._id}`, {
          data: { book: value.book },
        });

        this.getReservedBooks();
        this.getBooks();
        this.getUsers();

        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: `Reserve ${value.book.title} deleted`,
          life: 3000,
        });
      } catch (error) {
        console.log(error);
        this.getReservedBooks();
        this.getBooks();
        this.getUsers();

        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: `${error.response.data.message}`,
          life: 3000,
        });
      }
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

  computed: {
    searchedItems() {
      return this.bookActions;
    },
  },

  created() {
    this.getAllBookActions();
  },

  mounted() {
    this.data.user = this.users[0];
    this.data.book = this.books[0];
    this.data.date_reserved = moment(new Date()).format("YYYY-MM-DDTHH:mm");
  },
};
</script>
