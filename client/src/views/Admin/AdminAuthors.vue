<template>
  <div>
    <Toast />
    <admin-table
      title="Authors"
      v-model:searchQuery="searchQuery"
      :data="searchedItems"
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
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable.vue";

import ModalForm from "@/components/UI/ModalForm";
import AdminAuthorForm from "@/components/Admin/Forms/AdminAuthorForm";

import adminFormMixin from "@/mixins/adminFormMixin.js";
import dataStore from "@/mixins/dataStore.js";
import toggle from "@/mixins/toggle.js";

export default {
  name: "admin-authors",
  mixins: [toggle, adminFormMixin, dataStore],
  components: {
    AdminTable,
    ModalForm,
    AdminAuthorForm,
  },

  data() {
    return {
      initialEditForm: { first_name: "", last_name: "" },
      data: {
        first_name: "",
        last_name: "",
      },

      editForm: {
        _id: "",
        first_name: "",
        last_name: "",
      },
    };
  },

  methods: {
    onDeleteData(value) {
      this.removeData(`/books/deleteauthor/${value._id}`, this.getAuthors);
      this.showMessage(`${value.first_name} ${value.last_name} deleted`);
    },

    // onDeleteItems(items) {
    //   const ids = [];
    //   items.forEach((elem) => {
    //     ids.push(elem._id);
    //   });

    //   this.removeManyEntries(`/books/deletemanyauthors`, ids, this.getAuthors);
    //   this.showMessage("Items deleted");
    // },

    resetForm() {
      this.data.first_name = "";
      this.data.last_name = "";
    },

    resetEditForm() {
      this.editForm.first_name = this.initialEditForm.first_name;
      this.editForm.last_name = this.initialEditForm.last_name;
    },
  },

  computed: {
    searchedItems() {
      return this.authors.filter((item) => {
        return (
          item.first_name
            ?.toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          item.last_name?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },

  mounted() {
    this.getAuthors();
  },
};
</script>
