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
            <admin-user-form
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

  <!-- <div>
    <my-alert :message="message" v-if="showMessage" />

    <admin-table
      titleTable="Reserved books"
      :headers="headers"
      :data="reservedBooks"
    >
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
            <select class="form-control select" v-model="data.user">
              <option v-for="user in users" :key="user._id" :value="user">
                {{ user.username }}
              </option>
            </select>

            <select class="form-control select" v-model="data.book">
              <option v-for="book in books" :key="book._id" :value="book">
                {{ book.title }}
              </option>
            </select>

            <input
              class="form-control select"
              type="datetime-local"
              v-model="data.date_reserved"
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-danger">Reset</button>
            </div>
          </form>
        </my-modal>
        <my-modal :showModal="showEditModal" @close="showEditModal = false">
          <form @submit.prevent="onSubmitUpdate" @reset="onResetUpdate">
            <select class="form-control select" v-model="editForm.user">
              <option v-for="user in users" :key="user._id" :value="user">
                {{ user.username }}
              </option>
            </select>

            <select class="form-control select" v-model="editForm.book">
              <option v-for="book in books" :key="book._id" :value="book">
                {{ book.title }}
              </option>
            </select>

            <input
              class="form-control select"
              type="datetime-local"
              v-model="editForm.date_reserved"
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="reset" class="btn btn-danger">Cancel</button>
            </div>
          </form>
        </my-modal>
      </template>
      <template v-slot:data>
        <tr v-for="book in reservedBooks" :key="book._id">
          <td>{{ book.user.username }}</td>
          <td>{{ book.book.title }}</td>
          <td>
            {{ moment(book.date_reserved).format("YYYY-MM-DD hh:mm") }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              @click="editRecord(book)"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="onDeleteRecord(book)"
            >
              Delete
            </button>
          </td>
        </tr>
      </template>
    </admin-table>
  </div> -->
</template>

<script>
import moment from "moment";

import AdminTable from "@/components/Admin/AdminTable.vue";
// import MyAlert from "@/components/UI/MyAlert";
import AdminReservedBooksForm from "@/components/Admin/Forms/AdminReservedBooksForm.vue";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-reservedBooks",
  mixins: [toggle, adminFormMixin],
  components: { AdminTable, AdminReservedBooksForm },
  data() {
    return {
      moment: moment,
      data: {
        user: null,
        book: null,
        date_reserved: moment(new Date()).format("YYYY-MM-DDThh:mm"),
      },

      editForm: {
        _id: "",
        user: "",
        book: "",
        date_reserved: "",
      },

      headers: ["User", "Book", "Reserved date"],

      showMessage: false,
    };
  },

  created() {
    this.getBooks();
    this.getUsers();
    this.getReservedBooks();
  },
};
</script>
