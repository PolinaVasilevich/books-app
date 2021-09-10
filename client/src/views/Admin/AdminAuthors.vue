<template>
  <div>
    <Toast />
    <admin-table
      v-if="!loading"
      title="Authors"
      v-model:searchQuery="searchQuery"
      :data="searchedAuthors"
      @createNew="createNew"
      @editItem="editData"
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
          <admin-author-form @submitForm="onSubmit" :initForm="initForm" />
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

import { ref, onMounted } from "vue";
import useAuthors from "@/hooks/Author/useAuthors";
import useSearchedAuthors from "@/hooks/Author/useSearchedAuthors";
import useAxios from "@/hooks/useAxios";
import { useToast } from "primevue/usetoast";

export default {
  name: "admin-authors",

  components: {
    AdminTable,
    AdminAuthorForm,
    AppLoader,
  },

  setup() {
    const toast = useToast();
    const { getData, authors, loading } = useAuthors();
    const { searchQuery, searchedAuthors } = useSearchedAuthors(authors);

    const initForm = ref({});
    const submitted = ref(false);
    const displayDialog = ref(false);

    const { fetchData, error } = useAxios();

    onMounted(() => {
      getData();
    });

    const createNew = () => {
      initForm.value = {
        first_name: "",
        last_name: "",
      };

      submitted.value = false;
      displayDialog.value = true;
    };

    const editData = (value) => {
      initForm.value = { ...value };
      displayDialog.value = true;
    };

    const hideDialog = () => {
      displayDialog.value = false;
      submitted.value = false;
    };

    const onSubmit = async (data) => {
      if (initForm.value._id) {
        await fetchData({
          method: "PUT",
          url: `/books/updateauthor/${initForm.value._id}`,
          data: { ...initForm.value, ...data },
        });
        getData();

        if (error.value) {
          error.value.response.data.message
            ? toast.add({
                severity: "error",
                summary: "Error",
                detail: error.value.response.data.message,
                life: 3000,
              })
            : console.log(error);
          console.log(error.value);
        } else {
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Item updated",
            life: 3000,
          });
        }
      } else {
        await fetchData({
          method: "POST",
          url: "/books/author",
          data,
        });
        getData();
        if (error.value) {
          error.value.response.data.message
            ? toast.add({
                severity: "error",
                summary: "Error",
                detail: error.value.response.data.message,
                life: 3000,
              })
            : console.log(error);
          console.log(error.value);
        } else {
          toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Item created",
            life: 3000,
          });
        }
      }
      displayDialog.value = false;
    };

    const onDelete = async (data) => {
      await fetchData({
        method: "DELETE",
        url: `/books/deleteauthor/${data._id}`,
      });
      getData();

      if (error.value) {
        console.log(error.value);
      } else {
        toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Item deleted",
          life: 3000,
        });
      }
    };

    return {
      searchQuery,
      searchedAuthors,
      loading,
      initForm,
      submitted,
      displayDialog,

      createNew,
      hideDialog,
      onSubmit,
      editData,
      onDelete,
    };
  },
};
</script>
