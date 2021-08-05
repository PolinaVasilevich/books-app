<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
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
              v-model:reserved_book="data.reserved_date"
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
              v-model:user="editForm.user.username"
              v-model:book="editForm.user.title"
              v-model:reserved_book="editForm.user.reserved_book"
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
            {{ moment(item.book.date_reserved).format("YYYY-MM-DD hh:mm") }}
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
import MyAlert from "@/components/UI/MyAlert";
import ModalForm from "@/components/UI/ModalForm";
import AdminReservedBooksForm from "@/components/Admin/Forms/AdminReservedBooksForm.vue";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  mixins: [toggle, adminFormMixin],
  components: {
    AdminTable,
    MyAlert,
    ModalForm,
    AdminReservedBooksForm,
    AdminButtons,
  },

  data() {
    return {
      moment: moment,
      data: {
        username: "",
        password: "",
        isAdmin: false,
      },

      editForm: {
        _id: "",
        username: "",
        password: "",
        isAdmin: false,
      },

      headers: ["User", "Book", "Reserved Date"],
    };
  },

  methods: {
    onDeleteData(data) {
      this.removeData(`/auth/deleteuser/${data._id}`, this.getUsers);
    },

    editModal(item) {
      this.editForm = item;
      this.openEditModal();
    },
  },

  created() {
    this.getUsers();
  },
};
</script>
