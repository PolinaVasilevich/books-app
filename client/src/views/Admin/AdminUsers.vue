<template>
  <div>
    <admin-table titleTable="Users" :headers="headers" :data="users">
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
            <admin-user-form
              typeForm="create"
              v-model:username="data.username"
              v-model:password="data.password"
              v-model:isAdmin="data.isAdmin"
              :dataForm="data"
              path="auth/user"
              :callback="this.getUsers"
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
            <admin-user-form
              typeForm="update"
              v-model:username="editForm.username"
              v-model:password="editForm.password"
              v-model:isAdmin="editForm.isAdmin"
              :dataForm="editForm"
              :path="`/auth/updateuser/${editForm._id}`"
              :callback="this.getUsers"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr v-for="item in users" :key="item._id">
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.isAdmin }}</td>
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
import AdminTable from "@/components/Admin/AdminTable.vue";

import ModalForm from "@/components/UI/ModalForm";
import AdminUserForm from "@/components/Admin/Forms/AdminUserForm";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  mixins: [toggle, adminFormMixin],
  components: {
    AdminTable,

    ModalForm,
    AdminUserForm,
    AdminButtons,
  },

  data() {
    return {
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

      headers: ["Username", "Password", "Admin"],
    };
  },

  methods: {
    onDeleteData(data) {
      this.removeData(`/auth/deleteuser/${data._id}`, this.getUsers);
      this.message = "Record has deleted";
      this.openMessage();
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
