<template>
  <div>
    <my-alert :message="message" v-if="showMessage" />
    <admin-table titleTable="Genres" :headers="headers" :data="genres">
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
            <admin-genre-create-form
              typeForm="create"
              v-model:name="data.name"
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
            <admin-genre-create-form
              typeForm="update"
              v-model:name="editForm.name"
              :dataForm="editForm"
              @closeModal="closeEditModal"
            />
          </template>
        </modal-form>
      </template>
      <template v-slot:data>
        <tr v-for="genre in genres" :key="genre._id">
          <td>{{ genre.name }}</td>
          <td>
            <admin-buttons
              @showEditForm="editModal(genre)"
              @delete="onDeleteData(genre)"
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
import AdminGenreCreateForm from "@/components/Admin/Forms/AdminGenreCreateForm";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-genres",
  mixins: [toggle, adminFormMixin],
  components: {
    AdminTable,
    MyAlert,
    ModalForm,
    AdminGenreCreateForm,
    AdminButtons,
  },

  data() {
    return {
      data: {
        name: "",
      },

      editForm: {
        _id: "",
        name: "",
      },

      headers: ["Name"],
    };
  },

  methods: {
    onDeleteData(data) {
      this.removeData(`/books/deletegenre/${data._id}`, this.getGenres);
    },

    editModal(genre) {
      this.editForm = genre;
      this.openEditModal();
    },
  },

  created() {
    this.getGenres();
  },
};
</script>
