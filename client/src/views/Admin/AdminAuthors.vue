<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
    <admin-table titleTable="Authors" :headers="headers" :data="authors">
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
            <admin-author-form
              typeForm="create"
              v-model:first_name="data.first_name"
              v-model:last_name="data.last_name"
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
            <admin-author-form
              typeForm="update"
              v-model:first_name="editForm.first_name"
              v-model:last_name="editForm.last_name"
              :dataForm="editForm"
              @closeModal="closeEditModal"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr v-for="author in authors" :key="author._id">
          <td>{{ author.first_name }}</td>
          <td>{{ author.last_name }}</td>
          <td>
            <admin-buttons
              @showEditForm="editModal(author)"
              @delete="onDeleteData(author)"
            />
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";
import MyAlert from "@/components/UI/MyAlert";

import ModalForm from "@/components/UI/ModalForm";
import AdminAuthorForm from "@/components/Admin/Forms/AdminAuthorForm";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-authors",
  mixins: [toggle, adminFormMixin],
  components: {
    AdminTable,
    MyAlert,
    ModalForm,
    AdminAuthorForm,
    AdminButtons,
  },

  data() {
    return {
      data: {
        first_name: "",
        last_name: "",
      },

      editForm: {
        _id: "",
        first_name: "",
        last_name: "",
      },

      headers: ["First name", "Last name"],
    };
  },

  methods: {
    onDeleteData(data) {
      this.removeData(`/books/deleteauthor/${data._id}`, this.getAuthors);
    },

    editModal(item) {
      this.editForm = item;
      this.openEditModal();
    },
  },

  created() {
    this.getAuthors();
  },
};
</script>
