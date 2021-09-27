<template>
  <div>
    <Toast />
    <admin-table
      v-if="!loading"
      title="Authors"
      v-model:searchQuery="searchQuery"
      :data="searchedAuthors"
      @openModal="showCreateItemDialog"
      @openEditModal="showEditItemDialog"
      @deleteItem="onDelete"
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
        <Dialog
          v-model:visible="displayDialog"
          header="Author"
          :modal="true"
          style="width: 40vw"
        >
          <admin-author-form
            @submitForm="onSubmit"
            :initialForm="initialForm"
          />
        </Dialog>
      </template>
    </admin-table>
    <app-loader v-else />
  </div>
</template>

<script lang="ts">
import AdminTable from "@/components/Admin/AdminTable.vue";

import AdminAuthorForm from "@/components/Admin/Forms/AdminAuthorForm.vue";
import AppLoader from "@/components/AppLoader.vue";

import { reactive, ref, Ref, onMounted, defineComponent } from "vue";

import useAuthor from "@/hooks/Author/useAuthor.ts";
import Author from "@/models/Author";
import useSearchedAuthors from "@/hooks/Author/useSearchedAuthors.ts";
import useForm from "@/hooks/useForm";

import useDialog from "@/hooks/useDialog";
import useMessage from "@/hooks/useMessage";

export default defineComponent({
  name: "admin-authors",

  components: {
    AdminTable,
    AdminAuthorForm,
    AppLoader,
  },

  setup() {
    const {
      response: authors,
      loading,
      errorMessage: error,
      responseMessage,
      getAuthors,
      updateAuthor,
      createAuthor,
      deleteAuthor,
    } = useAuthor();

    const { searchQuery, searchedAuthors } = useSearchedAuthors(authors);
    const { submitted, displayDialog, hideDialog, showDialog } = useDialog();
    const { showErrorMessage, showSuccessfulMessage } = useMessage();

    let initialForm = ref({
      _id: "",
      first_name: "",
      last_name: "",
    });

    onMounted(() => {
      getAuthors();
    });

    const showCreateItemDialog = () => {
      initialForm.value = { _id: "", first_name: "", last_name: "" };
      showDialog();
    };

    const showEditItemDialog = (value: Author) => {
      initialForm.value = { ...value };
      showDialog();
    };

    const onSubmit = async (data: Author) => {
      if (initialForm.value._id) {
        await updateAuthor(initialForm.value._id, {
          ...initialForm.value,
          ...data,
        });
      } else {
        await createAuthor(data);
      }

      displayDialog.value = false;
      getAuthors();

      if (error.value) {
        showErrorMessage(error.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    const onDelete = async (data: Author) => {
      await deleteAuthor(data._id);
      getAuthors();
      if (error.value) {
        showErrorMessage(error.value);
      } else {
        showSuccessfulMessage(responseMessage);
      }
    };

    return {
      searchQuery,
      searchedAuthors,
      loading,
      initialForm,
      submitted,
      displayDialog,
      hideDialog,
      showCreateItemDialog,
      showEditItemDialog,
      onSubmit,
      onDelete,
    };
  },
});
</script>
