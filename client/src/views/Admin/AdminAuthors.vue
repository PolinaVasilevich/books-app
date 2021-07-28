<template>
  <div>
    <h1>Welcome to administrator page</h1>
    <admin-table titleTable="Authors" :headers="headers" :data="authors">
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
              v-model="author.first_name"
              placeholder="Enter title"
              required
            />
            <input
              class="form-control input"
              type="text"
              v-model="author.last_name"
              placeholder="Enter author"
              required
            />

            <div class="btns">
              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="reset" class="btn btn-danger">Reset</button>
            </div>
          </form>
        </my-modal>
      </template>
      <template v-slot:data>
        <tr v-for="author in authors" :key="author._id">
          <td>{{ author.first_name }}</td>
          <td>{{ author.last_name }}</td>
          <td>
            <button type="button" class="btn btn-warning btn-sm">Update</button>
            <button type="button" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </template>
    </admin-table>
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";

import API from "@/utils/api";

export default {
  name: "admin-authors",
  components: { AdminTable },
  data() {
    return {
      showModal: false,
      author: {
        first_name: "",
        last_name: "",
      },
      headers: ["First name", "Last Name"],
      authors: null,
    };
  },
  methods: {
    async getAuthors() {
      try {
        const authors = await API.get("books/allauthors");
        this.authors = authors.data;
      } catch (error) {
        console.log(error);
      }
    },

    async addAuthor(payload) {
      try {
        await API.post("books/author", payload);
        this.getAuthors();
      } catch (error) {
        console.log(error);
        this.getAuthors();
      }
    },

    resetForm() {
      this.author.first_name = "";
      this.author.last_name = "";
    },

    onSubmit() {
      this.showModal = false;
      this.addAuthor({ ...this.author });
      this.resetForm();
    },
  },

  created() {
    this.getAuthors();
  },
};
</script>
