<template>
  <div>
    <Toast />
    <admin-table
      v-if="!loading"
      title="Authors"
      v-model:searchQuery="searchQuery"
      :data="searchedAuthors"
      @createNew="showCreateNewItemDialog"
      @editItem="showEditItemDialog"
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
          <admin-author-form @submitForm="onSubmit" :initForm="initialForm" />
        </Dialog>
      </template>
    </admin-table>
    <app-loader v-else />
  </div>
</template>

<script>
import AdminTable from "@/components/Admin/AdminTable copy";

import AdminAuthorForm from "@/components/Admin/Forms/AdminAuthorForm";
import AppLoader from "@/components/AppLoader";

import { onMounted } from "vue";
import useAuthors from "@/hooks/Author/useAuthors";
import useSearchedAuthors from "@/hooks/Author/useSearchedAuthors";

import useAdminForm from "@/hooks/useAdminForm";

export default {
  name: "admin-authors",

  components: {
    AdminTable,
    AdminAuthorForm,
    AppLoader,
  },

  setup() {
    const { getData, authors, loading } = useAuthors();
    const { searchQuery, searchedAuthors } = useSearchedAuthors(authors);

    onMounted(() => {
      getData();
    });

    const {
      initialForm,
      submitted,
      displayDialog,
      showCreateNewItemDialog,
      showEditItemDialog,
      createNewItem,
      hideDialog,

      updateItem,
      removeItem,
    } = useAdminForm({
      first_name: "",
      last_name: "",
    });

    const onSubmit = async (data) => {
      if (initialForm.value._id) {
        await updateItem("/books/updateauthor", data);

        // const { loading, error } = await useAxios({
        //   method: "PUT",
        //   url: `/books/updateauthor/${initialForm.value._id}`,
        //   data,
        // });
      } else {
        await createNewItem("/books/author", data);
      }
      getData();
      displayDialog.value = false;
    };

    const onDelete = async (data) => {
      await removeItem("/books/deleteauthor", data);
      getData();
    };

    return {
      searchQuery,
      searchedAuthors,
      loading,
      submitted,
      displayDialog,
      initialForm,
      createNewItem,
      hideDialog,
      onSubmit,
      showEditItemDialog,
      onDelete,
      showCreateNewItemDialog,
    };
  },
};
</script>
