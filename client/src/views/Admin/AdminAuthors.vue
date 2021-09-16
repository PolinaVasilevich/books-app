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

<script>
import AdminTable from "@/components/Admin/AdminTable";

import AdminAuthorForm from "@/components/Admin/Forms/AdminAuthorForm";
import AppLoader from "@/components/AppLoader";

import { ref, onMounted } from "vue";
import useAuthor from "@/hooks/Author/useAuthor";
import useSearchedAuthors from "@/hooks/Author/useSearchedAuthors";
import useForm from "@/hooks/useForm";

import useDialog from "@/hooks/useDialog";
import useMessage from "@/hooks/useMessage";

export default {
  name: "admin-authors",

  components: {
    AdminTable,
    AdminAuthorForm,
    AppLoader,
  },

  setup() {
    const {
      data: authors,
      loading,
      error,
      responseMessage,
      getAuthors,
      updateAuthor,
      createAuthor,
      deleteAuthor,
    } = useAuthor();

    const { searchQuery, searchedAuthors } = useSearchedAuthors(authors);
    const { submitted, displayDialog, hideDialog, showDialog } = useDialog();
    const { showErrorMessage, showSuccessfulMessage } = useMessage();

    const initialForm = ref({});

    onMounted(() => {
      getAuthors();
    });

    const showCreateItemDialog = () => {
      initialForm.value = { first_name: "", last_name: "" };
      showDialog();
    };

    const showEditItemDialog = (value) => {
      initialForm.value = { ...value };
      showDialog();
    };

    const onSubmit = async (data) => {
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
        showSuccessfulMessage(responseMessage.value);
      }
    };

    const onDelete = async (data) => {
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
};
</script>
