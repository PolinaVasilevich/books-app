<template>
  <admin-content
    titleTable="Autors"
    :headers="headers"
    :data="authors"
    v-model:editModalVisible="showEditForm"
    :createData="{
      path: 'books/author',
      form: this.author,
      callback: this.getAuthors,
    }"
    @resetForm="resetForm"
  >
    <template v-slot:create-form>
      <my-input
        type="text"
        v-model.trim="author.first_name"
        placeholder="Enter first name"
        required
      />
      <my-input
        type="text"
        v-model.trim="author.last_name"
        placeholder="Enter last name"
        required
      />
    </template>
    <template v-slot:edit-form>
      <my-input
        type="text"
        v-model.trim="editForm.first_name"
        placeholder="Enter first name"
        required
      />
      <my-input
        type="text"
        v-model.trim="editForm.last_name"
        placeholder="Enter last name"
        required
      />
    </template>
    <template v-slot:data>
      <tr v-for="author in authors" :key="author._id">
        <td>
          {{ author.first_name }}
        </td>
        <td>
          {{ author.last_name }}
        </td>
        <td>
          <button
            type="button"
            class="btn btn-warning btn-sm"
            @click="
              () => {
                editData(author);
                showEditForm = true;
              }
            "
          >
            Update
          </button>
          <button
            type="button"
            class="btn btn-danger btn-sm"
            @click="onDeleteRecord(author)"
          >
            Delete
          </button>
        </td>
      </tr>
    </template>
  </admin-content>
</template>

<script>
import AdminContent from "@/components/Admin/AdminContent";

import mixin from "@/mixins/formMixin.js";

export default {
  name: "admin-authors",
  components: { AdminContent },
  mixins: [mixin],
  data() {
    return {
      author: {
        first_name: "",
        last_name: "",
      },

      editForm: {
        _id: "",
        first_name: "",
        last_name: "",
      },

      headers: ["First name", "Last Name"],
      showEditForm: false,
    };
  },

  methods: {
    onDeleteRecord(author) {
      this.removeRecord(`/books/deleteauthor/${author._id}`, this.getAuthors);
    },

    onSubmitUpdate() {
      this.updateRecord(
        `/books/updateauthor/${this.editForm._id}`,
        this.editForm
      );
    },

    resetForm(value) {
      this.author = value;
    },
  },

  created() {
    this.getAuthors();
  },
};
</script>
