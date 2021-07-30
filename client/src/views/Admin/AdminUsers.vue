<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
    <admin-table titleTable="Users" :headers="headers" :data="users">
      <template v-slot:modal>
        <button
          type="button"
          class="btn btn-success btn-sm"
          @click="showModal = true"
        >
          Create new record
        </button>
        <my-modal :showModal="showModal" @close="showModal = false">
          <form @submit.prevent="onSubmit" @reset="resetForm">
            <input
              class="form-control input"
              type="text"
              v-model.trim="user.username"
              placeholder="Enter username"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model.trim="user.password"
              placeholder="Enter password"
              required
            />

            <div class="form-check form-check-inline">
              <label class="form-check-label" for="inlineCheckbox1"
                >Admin</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                v-model="user.isAdmin"
              />
            </div>

            <div class="btns">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-danger">Reset</button>
            </div>
          </form>
        </my-modal>

        <my-modal :showModal="showEditModal" @close="showEditModal = false">
          <form @submit.prevent="onSubmitUpdate" @reset="onResetUpdate">
            <input
              class="form-control input"
              type="text"
              v-model.trim="editForm.username"
              placeholder="Enter username"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model.trim="editForm.password"
              placeholder="Enter password"
              required
            />

            <div class="form-check form-check-inline">
              <label class="form-check-label" for="inlineCheckbox1"
                >Admin</label
              >
              <input
                class="form-check-input"
                type="checkbox"
                id="inlineCheckbox1"
                v-model="editForm.isAdmin"
              />
            </div>

            <div class="btns">
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="reset" class="btn btn-danger">Cancel</button>
            </div>
          </form>
        </my-modal>
      </template>
      <template v-slot:data>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editUser(user)"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="onDeleteUser(user)"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AdminTable from "@/components/Admin/AdminTable.vue";
import MyAlert from "@/components/UI/MyAlert";
import API from "@/utils/api";

export default {
  name: "admin-users",
  components: { AdminTable, MyAlert },
  data() {
    return {
      user: {
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
      headers: ["UserName", "Password", "Admin"],
      message: "",

      showModal: false,
      showMessage: false,
      showEditModal: false,
    };
  },

  methods: {
    ...mapActions({
      getUsers: "login/getUsers",
    }),

    resetForm() {
      this.user.username = "";
      this.user.password = "";
      this.user.isAdmin = false;

      this.editForm._id = "";
      this.editForm.username = "";
      this.editForm.password = "";
      this.editForm.isAdmin = false;
    },

    async addUser(payload) {
      try {
        await API.post("auth/user", payload);
        this.getUsers();
        this.message = "User added!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getUsers();
      }
    },

    onSubmit() {
      this.showModal = false;
      this.addUser(this.user);
      this.resetForm();
    },

    async removeUser(userID) {
      try {
        await API.delete(`/auth/deleteuser/${userID}`);
        this.getUsers();
        this.message = "User removed!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getUsers();
      }
    },

    onDeleteUser(user) {
      this.removeUser(user._id);
    },

    editUser(user) {
      this.editForm = user;
      this.showEditModal = true;
    },

    async updateUser(payload, userID) {
      try {
        await API.put(`/auth/updateuser/${userID}`, payload);
        this.getUsers();
        this.message = "User updated!";
        this.showMessage = true;
      } catch (error) {
        console.log(error);
        this.getUsers();
      }
    },

    onSubmitUpdate() {
      this.showEditModal = false;
      this.updateUser(this.editForm, this.editForm._id);
    },

    onResetUpdate() {
      this.resetForm();
      this.getUsers();
    },
  },

  computed: {
    ...mapState("login", {
      users: (state) => state.users,
    }),
  },

  created() {
    this.getUsers();
  },
};
</script>
