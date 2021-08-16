<template>
  <div>
    <Toast />
    <admin-table
      title="Genres"
      v-model:searchQuery="searchQuery"
      :data="searchedItems"
      @openModal="openModal"
      @openEditModal="editModal"
      @deleteItem="onDeleteData"
    >
      <template #content>
        <Column
          field="name"
          header="Name"
          :sortable="true"
          style="min-width: 8rem"
        ></Column>
      </template>
      <template #modal>
        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template #modal-content>
            <admin-genre-form
              typeForm="create"
              v-model:name="data.name"
              :dataForm="data"
              path="books/genre"
              :callback="this.getGenres"
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
            <admin-genre-form
              typeForm="update"
              v-model:name="editForm.name"
              :dataForm="editForm"
              :path="`/books/updategenre/${editForm._id}`"
              :callback="this.getGenres"
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

import ModalForm from "@/components/UI/ModalForm";
import AdminGenreForm from "@/components/Admin/Forms/AdminGenreForm";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-genres",
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,
    ModalForm,
    AdminGenreForm,
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

      initialEditForm: { _id: "", name: "" },

      headers: ["Name"],
    };
  },

  methods: {
    onDeleteData(value) {
      this.removeData(`/books/deletegenre/${value._id}`, this.getGenres);
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: `${value.name} Deleted`,
        life: 3000,
      });
    },

    resetForm() {
      this.data.name = "";
    },

    resetEditForm() {
      this.editForm.name = this.initialEditForm.name;
    },
  },

  computed: {
    searchedItems() {
      return this.genres.filter((item) => {
        return item.name
          ?.toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },

  created() {
    this.getGenres();
  },
};
</script>
