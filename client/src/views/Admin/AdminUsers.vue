<template>
  <div>
    <Toast />
    <admin-table
      titleTable="Users"
      v-model:searchQuery="searchQuery"
      :data="searchedItems"
      @openModal="openModal"
      @openEditModal="editModal"
      @deleteItem="onDeleteData"
    >
      <template #content>
        <Column
          field="username"
          header="Username"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>

        <Column field="isAdmin" header="Admin" style="min-width: 5rem"></Column>
        <Column
          field="created_date"
          header="Registration Date"
          style="min-width: 10rem"
          :sortable="true"
        >
          <template #body="slotProps">
            {{
              slotProps.data.created_date
                ? moment(slotProps.data.created_date).format("YYYY-MM-DD HH:mm")
                : ""
            }}
          </template>
        </Column>
        <Column
          field="last_logon"
          header="Last logon"
          style="min-width: 10rem"
          :sortable="true"
        >
          <template #body="slotProps">
            {{
              slotProps.data.last_logon
                ? moment(slotProps.data.last_logon).format("YYYY-MM-DD HH:mm")
                : "User has not logged in yet"
            }}
          </template></Column
        >
      </template>
      <template #modal>
        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template #modal-content>
            <admin-user-form
              typeForm="create"
              v-model:username="data.username"
              v-model:password="data.password"
              v-model:isAdmin="data.isAdmin"
              :dataForm="data"
              path="auth/user"
              :callback="this.getUsers"
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
            <admin-user-form
              typeForm="update"
              v-model:username="editForm.username"
              v-model:password="editForm.password"
              v-model:isAdmin="editForm.isAdmin"
              :dataForm="editForm"
              :path="`/auth/updateuser/${editForm._id}`"
              :callback="this.getUsers"
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
import AdminTable from "@/components/Admin/AdminTable.vue";
import moment from "moment";

import ModalForm from "@/components/UI/ModalForm";
import AdminUserForm from "@/components/Admin/Forms/AdminUserForm";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-users",
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,
    ModalForm,
    AdminUserForm,
  },

  data() {
    return {
      moment,
      initialEditForm: {
        username: "",
        password: "",
        isAdmin: false,
      },

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
    onDeleteData(value) {
      this.removeData(`/auth/deleteuser/${value._id}`, this.getUsers);
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: `${value.username} Deleted`,
        life: 3000,
      });
    },

    resetForm() {
      this.data.username = "";
      this.data.password = "";
      this.data.isAdmin = false;
    },

    resetEditForm() {
      this.editForm.username = this.initialEditForm.username;
      this.editForm.password = this.initialEditForm.password;
      this.editForm.isAdmin = this.initialEditForm.isAdmin;
    },
  },

  computed: {
    searchedItems() {
      return this.users.filter((item) => {
        return item.username
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },

  created() {
    this.getUsers();
  },
};
</script>
