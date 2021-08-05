<template>
  <div>
    <!-- <my-alert :message="message" v-if="showMessage" /> -->
    <admin-table
      titleTable="Reserved books"
      :headers="headers"
      :data="reservedBooks"
    >
      <template v-slot:modal>
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
              @closeModal="closeModal"
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
              @closeModal="closeEditModal"
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
// import MyAlert from "@/components/UI/MyAlert";
import ModalForm from "@/components/UI/ModalForm";
import AdminReservedBooksForm from "@/components/Admin/Forms/AdminReservedBooksForm.vue";
import AdminButtons from "@/components/Admin/AdminButtons";

import API from "@/utils/api";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  mixins: [toggle, adminFormMixin],
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
      this.openEditModal();
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
