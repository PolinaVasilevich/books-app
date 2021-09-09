<template>
  <div>
    <Toast />
    <admin-table
      v-if="!loading"
      title="Authors"
      v-model:searchQuery="searchQuery"
      :data="searchedAuthors"
      @openModal="openModal"
      @openEditModal="editModal"
      @deleteItem="onDeleteData"
      @deleteItems="
        deleteItems($event, '/books/deletemanyauthors', this.getAuthors)
      "
    >
      <template #content>
        <Column
          field="first_name"
          header="First name"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>

        <Column
          field="last_name"
          header="Last name"
          :sortable="true"
          style="min-width: 10rem"
        ></Column>
      </template>
      <template #modal>
        <modal-form
          modal-title="Create new record"
          :displayModal="displayModal"
          @close="closeModal"
        >
          <template #modal-content>
            <admin-author-form
              typeForm="create"
              v-model:first_name="data.first_name"
              v-model:last_name="data.last_name"
              :dataForm="data"
              path="books/author"
              :callback="this.getAuthors"
              :textMessage="`${data.first_name} ${data.last_name} created`"
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
            <admin-author-form
              typeForm="update"
              v-model:first_name="editForm.first_name"
              v-model:last_name="editForm.last_name"
              :dataForm="editForm"
              :path="`/books/updateauthor/${editForm._id}`"
              :callback="this.getAuthors"
              @resetForm="resetEditForm"
              @closeModal="closeEditModal"
              @showMessage="showMessage"
              @showErrorMessage="showErrorMessage"
            />
          </template>
        </modal-form>
      </template>
    </admin-table>
    <app-loader v-else />
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";
import AppLoader from "@/components/AppLoader";

import ModalForm from "@/components/UI/ModalForm";
import AdminAuthorForm from "@/components/Admin/Forms/AdminAuthorForm";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import toggle from "@/mixins/toggle.js";

import useAuthors from "@/hooks/Author/useAuthors";
import useSearchedAuthors from "@/hooks/Author/useSearchedAuthors";

export default {
  name: "admin-authors",
  mixins: [toggle, adminFormMixin],
  components: {
    AdminTable,
    ModalForm,
    AdminAuthorForm,
    AppLoader,
  },

  setup() {
    const { authors, loading } = useAuthors();
    const { searchQuery, searchedAuthors } = useSearchedAuthors(authors);

    const initialEditForm = { first_name: "", last_name: "" };

    const editForm = {
      _id: "",
      first_name: "",
      last_name: "",
    };

    return {
      authors,
      loading,
      searchQuery,
      searchedAuthors,
      initialEditForm,
      editForm,
    };
  },

  methods: {
    onDeleteData(value) {
      this.removeData(
        `/books/deleteauthor/${value._id}`,
        this.getAuthors,
        `${value.first_name} ${value.last_name} deleted`
      );
    },

    resetForm() {
      this.data.first_name = "";
      this.data.last_name = "";
    },

    resetEditForm() {
      this.editForm.first_name = this.initialEditForm.first_name;
      this.editForm.last_name = this.initialEditForm.last_name;
    },
  },
};
</script>
