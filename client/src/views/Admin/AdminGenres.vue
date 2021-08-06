<template>
  <div>
    <admin-table titleTable="Genres" :headers="headers" :data="genres">
      <template v-slot:modal>
        <Message v-if="displayMessage" :severity="success">{{
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
            <admin-genre-form
              typeForm="create"
              v-model:name="data.name"
              :dataForm="data"
              @closeModal="closeModal"
              @showMessage="showMessage"
            />
          </template>
        </modal-form>

        <modal-form
          modal-title="Update record"
          :displayModal="displayEditModal"
          @close="closeEditModal"
        >
          <template v-slot:modal-content>
            <admin-genre-form
              typeForm="update"
              v-model:name="editForm.name"
              :dataForm="editForm"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
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

import ModalForm from "@/components/UI/ModalForm";
import AdminGenreForm from "@/components/Admin/Forms/AdminGenreForm";
import AdminButtons from "@/components/Admin/AdminButtons";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-genres",
  mixins: [toggle, adminFormMixin],
  components: {
    AdminTable,
    ModalForm,
    AdminGenreForm,
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
      this.message = "Record has deleted";
      this.openMessage();
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
